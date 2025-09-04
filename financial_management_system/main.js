import localDB from './db.js'


setDataForTable()
async function setDataForTable() {
    let allOperations = await localDB.getAll("operations")
    let incomeData = allOperations.filter(op => op.type > 0)
    let expensData = allOperations.filter(op => op.type < 0)
    let allCategories = await localDB.getAll("categories")

    // localDB.add("operations", {value: 140, type: 1, date: new Date, categoryId: 1})
    // localDB.add("operations", {value: 2500, type: 1, date: new Date, categoryId: 2})
    // localDB.add("operations", {value: 230, type: 1, date: new Date, categoryId: 1})


    // localDB.add("operations", {value: 140, type: -1, date: new Date, categoryId: 3})
    // localDB.add("operations", {value: 1300, type: -1, date: new Date, categoryId: 4})
    // localDB.add("operations", {value: 250, type: -1, date: new Date, categoryId: 5})
    // localDB.add("operations", {value: 1440, type: -1, date: new Date, categoryId: 4})

    // localDB.add("categories", {name: "зарплата",  type: 'income' })
    // localDB.add("categories", {name: "подработка",  type: 'income' })

    // localDB.add("categories", {name: "еда", type: 'expens' })
    // localDB.add("categories", {name: "топливо", type: 'expens'})
    // localDB.add("categories", {name: "парковка", type: 'expens'})



    const fillTable = (htmlElement, dataArray) => {
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
            
            // row.addEventListener("click", () => {showEditForm(data);})

            tbody.appendChild(row);
        });
    }

    fillTable(main_table_income, incomeData)
    fillTable(main_table_expens, expensData)
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
    clearEventsForSaveButton()
})

//показать окно с редактированием дохода
async function showEditForm(dataObject) {
    await setValuesForEditForm(dataObject)
    save_form_button.addEventListener("click", () => { editOperation(dataObject.id) })
    create_form_container.style.visibility = 'visible'
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
    clearEventsForSaveButton()
    create_form_container.style.visibility = 'hidden'
}

////////////////////////////////////////////////////////////////////////////////////////////////////////редактирование операций

//редактирование операции(расхода или дохода)
async function editOperation(operationId) {
    if (!isFormValid()) return
    const newObj = await getObjectForm()
    console.log("operations", operationId, newObj)
    create_form_container.style.visibility = 'hidden'
    clearEventsForSaveButton()
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


//сброс ивента
function clearEventsForSaveButton() {
    save_form_button.removeEventListener("click", createIncomeOperation)
    save_form_button.removeEventListener("click", createExpensOperation)
    save_form_button.removeEventListener("click", () => {editOperation()})
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

function btnPress(id) {
    console.log(id)
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

const formatDate = (dateObj) => {
    const addNul = (number) => number < 9 ? `0${number}` : number
    return `${addNul(dateObj.getFullYear())}-${addNul(dateObj.getMonth())}-${addNul(dateObj.getDate())}`
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////Клики по линиям

function clickToTr(data){
    console.log("trClick: " + data.id )
}