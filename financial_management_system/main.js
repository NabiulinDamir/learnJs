import localDB from './db.js'


setDataForTable()
async function setDataForTable() {
    let allOperations = await localDB.getAll("operations")
    let incomeData = allOperations.filter(op => op.type > 0)
    let expensData = allOperations.filter(op => op.type < 0)
    let allCategories = await localDB.getAll("categories")



    let incomeSortedOptions = { factor: "category", increasing: false }
    incomeSortedOptions = { factor: "value", increasing: false }
    // incomeSortedOptions = { factor: "date", increasing: false }
    // incomeSortedOptions = { factor: "id", increasing: true }

    let expensSortedOptions = { factor: "category", increasing: false }
    expensSortedOptions = { factor: "value", increasing: false }
    // expensSortedOptions = { factor: "date", increasing: false }
    // expensSortedOptions = { factor: "id", increasing: true }

    incomeData.sort((a, b) => b.value - a.value)

    incomeData.sort((a, b) => b.date.getTime() - a.date.getTime())

    incomeData.sort((a, b) => {
        const categotyAtext = allCategories.find(category => category.id === a.categoryId).name
        const categotyBtext = allCategories.find(category => category.id === b.categoryId).name 
        return categotyAtext.localeCompare(categotyBtext)
        
    })

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
            const category = allCategories.find(category => category.id === data.categoryId);
            const date = new Date(data.date);
            row.innerHTML = `
            <td>${category?.name || 'Unknown'}</td>
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

///////////////////////////////////////////////////////////////////////////////////////////////////////////////автоматическая работа с форомй

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
    await updateSelectorValues(dataObject.type > 0 ? 'income' : 'expens')
    const categoryData = await localDB.get("categories", dataObject.categoryId)
    category_input.value = categoryData.name
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
    const categoryId = await localDB.getCategoryIdForName(category_input.value)
    return { value, date, categoryId }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////ивенты

//показать окно с добавлением дохода
table_manager_button_income.addEventListener("click", async () => {
    await updateSelectorValues("income")
    setDefaultValuesForAddForm()
    save_form_button.addEventListener("click", createIncomeOperation, { once: true })
    create_form_container.style.visibility = 'visible'
})

//показать окно с добавлением расхода
table_manager_button_expens.addEventListener("click", async () => {
    await updateSelectorValues("expens")
    setDefaultValuesForAddForm()
    save_form_button.addEventListener("click", createExpensOperation, { once: true })
    create_form_container.style.visibility = 'visible'
})

//кнопка ОТМЕНА
hide_form_button.addEventListener("click", () => {
    create_form_container.style.visibility = 'hidden'
})

//Кнопка нет в форме подтверждения
hide_confirm_form_button.addEventListener("click", () => {
    clearEventsForConfirmButton()
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
    save_form_button.addEventListener("click", () => { editOperation(dataObject.id) }, { once: true })
    create_form_container.style.visibility = 'visible'
}

//показать окно с редактированием дохода
async function showConfirmForm(dataObject) {
    confirm_message.innerHTML = "Вы действительно хотите удалить выбранные операции?"
    confirm_form_button.addEventListener("click", deleteSelectedOperations)
    confirm_form_container.style.visibility = 'visible'
}

////////////////////////////////////////////////////////////////////////////////////////////////////////создание операций

//ивент создания дохода
async function createIncomeOperation() {
    if (!isFormValid()) return
    const value = +value_input.value
    const categoryId = await findCategory(category_input.value, 'income')
    createOperation(value, categoryId, new Date(date_selector.value), 1)
}

//ивент создания расхода
async function createExpensOperation() {
    if (!isFormValid()) return
    const value = +value_input.value
    const categoryId = await findCategory(category_input.value, 'expens')
    createOperation(value, categoryId, new Date(date_selector.value), -1)
}

//создание операции
async function createOperation(value, categoryId, date, type) {
    await localDB.add("operations", { value, date, categoryId, type });
    setDataForTable()
    create_form_container.style.visibility = 'hidden'
}

////////////////////////////////////////////////////////////////////////////////////////////////////////редактирование операций

//редактирование операции(расхода или дохода)
async function editOperation(operationId) {
    if (!isFormValid()) return
    const newObj = await getObjectForm()
    await localDB.set("operations", operationId, newObj)
    create_form_container.style.visibility = 'hidden'
    setDataForTable()
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
    clearEventsForConfirmButton()
    setDataForTable()

}

////////////////////////////////////////////////////////////////////////////////////////////////////////создание категорий

//если нету категории, то создаёт
//type === 'income' || 'expens'
async function findCategory(name, type) {
    const allCategories = await localDB.getAll("categories")
    const categories = allCategories.filter(category => category.type === type)
    let findCategoryId = categories.find(category => category.name === name)?.id
    if (!findCategoryId) {
        findCategoryId = await localDB.add("categories", { name, type })
    }
    return findCategoryId
}

function clearEventsForConfirmButton() {
    confirm_form_button.removeEventListener("click", deleteSelectedOperations)
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////Вспомогашки

const formatDate = (dateObj) => {
    const addNul = (number) => number < 9 ? `0${number}` : number
    return `${addNul(dateObj.getFullYear())}-${addNul(dateObj.getMonth())}-${addNul(dateObj.getDate())}`
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
top_cell_income_category.addEventListener("click", setSortedIndicator)
//сортировка по сумме
top_cell_income_value.addEventListener("click", setSortedIndicator)
//сортировка по дате
top_cell_income_date.addEventListener("click", setSortedIndicator)

//сортировка по категории
top_cell_expens_category.addEventListener("click", setSortedIndicator)
//сортировка по сумме
top_cell_expens_value.addEventListener("click", setSortedIndicator)
//сортировка по дате
top_cell_expens_date.addEventListener("click", setSortedIndicator)

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

///////////////////////////////////////////////////////////////////////////////////////////////////////////////