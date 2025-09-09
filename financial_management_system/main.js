import localDB from './db.js'
import { updateSalineChart, updateRoundChart } from './chart.js'


updateAllData()
async function updateAllData() {
    setDataForTable()
    updateSalineChart()
    updateRoundChart()
}


async function setDataForTable() {
    let allOperations = await localDB.getAll("operations")
    let incomeData = allOperations.filter(op => op.type > 0)
    let expensData = allOperations.filter(op => op.type < 0)

    const incomeSortedOptions = await localDB.get("sortOption", "incomeSortedOptions")
    const expensSortedOptions = await localDB.get("sortOption", "expensSortedOptions")

    sort(incomeData, incomeSortedOptions?.factor, incomeSortedOptions?.increasing)
    sort(expensData, expensSortedOptions?.factor, expensSortedOptions?.increasing)
    // localDB.add("operations", {type: 1, value: 140,  date: new Date, categoryId: 1})
    // localDB.add("operations", {type: 1, value: 2500, date: new Date, categoryId: 2})
    // localDB.add("operations", {type: 1, value: 230, date: new Date, categoryId: 1})

    // localDB.add("operations", {type: -1, value: 140, date: new Date, categoryId: 3})
    // localDB.add("operations", {type: -1, value: 1300, date: new Date, categoryId: 4})
    // localDB.add("operations", {type: -1, value: 250, date: new Date, categoryId: 5})
    // localDB.add("operations", {type: -1, value: 1440, date: new Date, categoryId: 4})

    // localDB.add("categories", {name: "зарплата",  type: 'income' })
    // localDB.add("categories", {name: "подработка",  type: 'income' })

    // localDB.add("categories", {name: "еда", type: 'expens' })
    // localDB.add("categories", {name: "топливо", type: 'expens'})
    // localDB.add("categories", {name: "парковка", type: 'expens'})



    fillTable(main_table_income, incomeData)
    fillTable(main_table_expens, expensData)

    function fillTable(htmlElement, dataArray) {
        // console.log(dataArray)
        const tbody = htmlElement.querySelector('tbody');
        tbody.innerHTML = "";

        dataArray.forEach(data => {
            const row = document.createElement('tr');
            const date = new Date(data.date);
            row.innerHTML = `
            <td>${data.category || 'Unknown'}</td>
            <td>${data.value}</td>
            <td>${formatDate(date)}</td>
            <td>
                <button class="flat_button">···</button>
            </td>`;

            row.querySelector('button').addEventListener("click", () => { showEditForm(data); });

            row.addEventListener("click", (event) => { clickToTr(data, event); })

            tbody.appendChild(row);
        });
    }


}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////
//array = [obj]
//factor = "value" || "date" || "category" || "id"
//increasing = true || false
//categoties = [obj]
async function sort(array, factor, increasing) {
    switch (factor) {
        case "value":
            array.sort((a, b) => b.value - a.value)
            break
        case "date":
            array.sort((a, b) => b.date.getTime() - a.date.getTime())
            break
        case "category":
            array.sort((a, b) => {
                return b.category.localeCompare(a.category)
            })
            break
        case "id":
            break
    }
    if (increasing) array.reverse()
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////работа с форомй

//установка значений в селекторе категорий
//categoryType = 'income' || 'expens'
async function updateSelectorValues(categoryType) {
    let categoryAllDataArray = await localDB.getAll('categories')
    let ategoryDataArray = categoryAllDataArray.filter(category => category.type === categoryType)
    category_select.innerHTML = ''
    category_input.value = ''
    ategoryDataArray.forEach(category => {
        category_select.innerHTML += `<option value="${category.name}"></option>`;
    });
    return
}

//установка дефолтных значений формы создания
function setDefaultValuesForAddForm() {
    date_selector.value = formatDate(new Date)
    value_input.value = ""
    value_input.classList.remove("err")
    category_input.classList.remove("err")
}

//установка значений по id операции для формы редактирования
async function setValuesForEditForm(dataObject) {
    value_input.value = dataObject.value
    category_input.value = dataObject.category
    date_selector.value = formatDate(dataObject.date)
}

//проверка валидности формы
function isFormValid() {
    value_input.classList.remove("err")
    category_input.classList.remove("err")
    const isValueValid = (+value_input.value > 0)
    const isSelectorValid = (category_input.value)
    if (!isValueValid) { value_input.classList.add("err") }
    if (!isSelectorValid) { category_input.classList.add("err") }
    return isValueValid && isSelectorValid
}

//читает форму и возвращает обьект
async function getObjectForm() {
    const value = +value_input.value
    const date = new Date(date_selector.value)
    const category = category_input.value
    return { value, date, category }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////ивенты

//показать окно с добавлением дохода
table_manager_button_income.addEventListener("click", async () => {
    await updateSelectorValues("income")
    setDefaultValuesForAddForm()
    save_form_button.addEventListener("click", createIncomeOperation)
    create_form_container.style.visibility = 'visible'
})

//показать окно с добавлением расхода
table_manager_button_expens.addEventListener("click", async () => {
    await updateSelectorValues("expens")
    setDefaultValuesForAddForm()
    save_form_button.addEventListener("click", createExpensOperation)
    create_form_container.style.visibility = 'visible'
})

//кнопка ОТМЕНА
hide_form_button.addEventListener("click", () => {
    create_form_container.style.visibility = 'hidden'

    clearAllEvents(save_form_button)
})

//Кнопка нет в форме подтверждения
hide_confirm_form_button.addEventListener("click", () => {
    confirm_form_button.removeEventListener("click", deleteSelectedOperations)
    clearSelectsForTable(main_table_income)
    clearSelectsForTable(main_table_expens)
    selectedIncomeObjects.clear()
    selectedExpensObjects.clear()
    confirm_form_container.style.visibility = 'hidden'
})

//Кнопки удаления расходов/доходов 
table_manager_button_delete_expens.addEventListener("click", showConfirmForm)
table_manager_button_delete_income.addEventListener("click", showConfirmForm)


////////////////////////////////////////////////////////////////////////////////////////////////////////Показать окна

//показать окно с редактированием дохода
async function showEditForm(dataObject) {
    await setValuesForEditForm(dataObject)
    save_form_button.addEventListener("click", () => { editOperation(dataObject) })
    create_form_container.style.visibility = 'visible'
}

//показать окно с подтверждением удаления
async function showConfirmForm() {
    confirm_message.innerHTML = "Вы действительно хотите удалить выбранные операции?"
    confirm_form_button.addEventListener("click", deleteSelectedOperations)
    confirm_form_container.style.visibility = 'visible'
}

////////////////////////////////////////////////////////////////////////////////////////////////////////создание операций

//ивент создания дохода
async function createIncomeOperation() {
    if (!isFormValid()) return
    const newObj = await getObjectForm()
    // const value = +value_input.value
    await checkCategory(category_input.value, 'income')
    await createOperation(newObj, 1)
    save_form_button.removeEventListener("click", createIncomeOperation)
}

//ивент создания расхода
async function createExpensOperation() {
    if (!isFormValid()) return
    const newObj = await getObjectForm()
    await checkCategory(category_input.value, 'expens')
    await createOperation(newObj, -1)
    save_form_button.removeEventListener("click", createExpensOperation)
}

//создание операции
async function createOperation(newObj, type) {
    await localDB.add("operations", { type, ...newObj });
    updateAllData()
    create_form_container.style.visibility = 'hidden'
}

////////////////////////////////////////////////////////////////////////////////////////////////////////редактирование операций

//редактирование операции(расхода или дохода)
async function editOperation(operationObj) {
    if (!isFormValid()) return
    const newObj = await getObjectForm()
    await checkCategory(newObj.category, ((operationObj.type > 0) ? "income" : "expens"))
    await localDB.setOperation(operationObj.id, newObj)
    create_form_container.style.visibility = 'hidden'
    clearAllEvents(save_form_button)
    updateAllData()
}

////////////////////////////////////////////////////////////////////////////////////////////////////////Удаление операций

//удаление выбранных операций в коллекциях selectedIncomeObjectsс и selectedExpensObjects
async function deleteSelectedOperations() {
    for (let operationObj of new Set([...selectedIncomeObjects, ...selectedExpensObjects])) {
        localDB.delete("operations", operationObj.id)
    }
    table_manager_button_delete_income.style.visibility = "hidden"
    table_manager_button_delete_expens.style.visibility = "hidden"
    confirm_form_container.style.visibility = 'hidden'
    confirm_form_button.removeEventListener("click", deleteSelectedOperations)
    updateAllData()

}

////////////////////////////////////////////////////////////////////////////////////////////////////////создание категорий

//если нету категории, то создаёт
//type === 'income' || 'expens'
async function checkCategory(name, type) {
    const allCategories = await localDB.getAll("categories")
    const categories = allCategories.filter(category => category.type === type)
    if (!(categories.map(c => c.name).includes(name))) await localDB.add("categories", { name, type })
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////Вспомогашки

const formatDate = (dateObj) => {
    const addNul = (number) => number < 10 ? `0${number}` : number
    return `${addNul(dateObj.getFullYear())}-${addNul(dateObj.getMonth() + 1)}-${addNul(dateObj.getDate())}`
}

const formatDateRevers = (dateObj) => {
    const addNul = (number) => number < 10 ? `0${number}` : number
    return `${addNul(dateObj.getDate())}.${addNul(dateObj.getMonth() + 1)}.${addNul(dateObj.getFullYear())}`
}

function clearAllEvents(element) {
    const newElement = element.cloneNode(true);
    element.replaceWith(newElement);
    return newElement;
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////Клики по линиям
let selectedIncomeObjects = new Set()
let selectedExpensObjects = new Set()

//клик по строке
function clickToTr(dataObj, event) {
    if (event.target.parentElement.tagName === 'TR') {
        event.target.parentElement.classList.toggle('select');
        toggleSelectedObjects(dataObj)
    }
}

//управление выделением строк и сбор массива для удаления
function toggleSelectedObjects(newObj) {

    if (newObj.type > 0) {
        clearSelectsForTable(main_table_expens)
        selectedExpensObjects.clear()
        if (!selectedIncomeObjects.has(newObj)) selectedIncomeObjects.add(newObj)
        else selectedIncomeObjects.delete(newObj)
    }
    else {
        clearSelectsForTable(main_table_income)
        selectedIncomeObjects.clear()
        if (!selectedExpensObjects.has(newObj)) selectedExpensObjects.add(newObj)
        else selectedExpensObjects.delete(newObj)
    }

    if (selectedIncomeObjects.size) table_manager_button_delete_income.style.visibility = "visible"
    else table_manager_button_delete_income.style.visibility = "hidden"
    if (selectedExpensObjects.size) table_manager_button_delete_expens.style.visibility = "visible"
    else table_manager_button_delete_expens.style.visibility = "hidden"

}

function clearSelectsForTable(table) {
    Array.from(table.getElementsByTagName("TBODY")[0]?.getElementsByClassName("select")).forEach(element => {
        element.classList.remove("select")
    })
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////Сортировочки

//сортировка по категории
top_cell_income_category.addEventListener("click", async (event) => {
    await setSortOption("incomeSortedOptions", "category")
    updateSortMarker(event, "incomeSortedOptions")
})
//сортировка по сумме
top_cell_income_value.addEventListener("click", async (event) => {
    await setSortOption("incomeSortedOptions", "value")
    updateSortMarker(event, "incomeSortedOptions")
})
//сортировка по дате
top_cell_income_date.addEventListener("click", async (event) => {
    await setSortOption("incomeSortedOptions", "date")
    updateSortMarker(event, "incomeSortedOptions")
})

//сортировка по категории
top_cell_expens_category.addEventListener("click", async (event) => {
    await setSortOption("expensSortedOptions", "category")
    updateSortMarker(event, "expensSortedOptions")
})
//сортировка по сумме
top_cell_expens_value.addEventListener("click", async (event) => {
    await setSortOption("expensSortedOptions", "value")
    updateSortMarker(event, "expensSortedOptions")
})
//сортировка по дате
top_cell_expens_date.addEventListener("click", async (event) => {
    await setSortOption("expensSortedOptions", "date")
    updateSortMarker(event, "expensSortedOptions")
})

//установка настроек сортировки
//optionName = "expensSortedOptions" || "incomeSortedOptions"
//sortFactor = "value" || "date" || "category" || "id"
async function setSortOption(optionName, sortFactor) {
    let oldOption = await localDB.get("sortOption", optionName)
    if (!oldOption) { await localDB.setSortOption(optionName, { factor: sortFactor, increasing: true }); return }
    if (oldOption.factor !== sortFactor) oldOption.factor = "id"
    if (oldOption.factor === "id") await localDB.setSortOption(optionName, { factor: sortFactor, increasing: true })
    else if (oldOption.increasing) await localDB.setSortOption(optionName, { factor: sortFactor, increasing: false })
    else await localDB.setSortOption(optionName, { factor: "id", increasing: true })
    setDataForTable()
}

async function updateSortMarker(event, optionName) {
    const sortOptions = await localDB.get("sortOption", optionName)
    let sortIndicator = sortOptions.increasing ? "▴" : "▾"
    if (sortOptions.factor === "id") sortIndicator = ""
    clearAll(event.target.parentElement)
    event.target.innerHTML += sortIndicator

    function clearAll(parent) {
        Array.from(parent.getElementsByTagName("TD")).forEach(element => {
            element.classList.remove("select")
            if (element.innerHTML.includes("▾") || element.innerHTML.includes("▴")) { element.innerHTML = element.innerHTML.slice(0, -1) }
        })
    }
}

//Управление индикатором
function setSortedIndicator(event) {
    Array.from(event.target.parentElement.getElementsByTagName("TD")).forEach(element => {
        if (element != event.target) {
            element.classList.remove("select")
            if (element.innerHTML.includes("⯆") || element.innerHTML.includes("⯅")) { element.innerHTML = element.innerHTML.slice(0, -1) }
        }
    })
    let elementText = event.target.innerHTML
    if (elementText.includes("⯆")) elementText = elementText.slice(0, -1) + "⯅"
    else if (elementText.includes("⯅")) {
        event.target.classList.remove("select")
        elementText = elementText.slice(0, -1)
    }
    else {
        event.target.classList.add("select")
        elementText += "⯆"
    }
    event.target.innerHTML = elementText

}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////Дата селектор

function setDateArr(scopeDate) {

}

function updatePosition(offsetLeft) {
    const anhorPosition = time_unit_selector.offsetLeft
    time_unit_selector.style.left = offsetLeft + 'px'

}


time_interval_choice_day.addEventListener("click", (event) => {
    document.getElementById("select_line").style.left = event.target.offsetLeft + 2 + "px"
    time_unit_selector.innerHTML = ''
    const startDate = new Date();
    const endDate = new Date();
    startDate.setDate(startDate.getDate() - 15);
    endDate.setDate(endDate.getDate() + 15);

    while (startDate.getDate() != endDate.getDate()) {
        startDate.setDate(startDate.getDate() + 1);
        const day = document.createElement('div');
        day.classList.add('time_cell')
        day.innerHTML = `${formatDateRevers(startDate)}`;
        day.addEventListener("click", (event) => { console.log('hui') })
        if(startDate.getDay() == (new Date).getDay()) day.classList.add('select')
        time_unit_selector.appendChild(day);
    }
    updatePosition(-screen.width / 2 - 15)
})

function slideToDate() {

}



time_interval_choice_day.click()

time_interval_choice_month.addEventListener("click", (event) => {
    document.getElementById("select_line").style.left = event.target.offsetLeft + 2 + "px"

})

time_interval_choice_year.addEventListener("click", (event) => {
    document.getElementById("select_line").style.left = event.target.offsetLeft + 3 + "px"

})
