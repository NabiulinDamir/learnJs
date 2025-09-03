import localDB from './db.js'


setDataForTable()
async function setDataForTable() {
    let allOperations = await localDB.getAll("operations")
    let incomeData = allOperations.filter(op => op.value > 0)
    let expensData = allOperations.filter(op => op.value < 0)
    let incomeCategoriesData = await localDB.getAll("income_categories")
    let expensCategoriesData = await localDB.getAll("expens_categories")

    // localDB.add("operations", {value: 140, date: new Date, categoryId: 1})
    // localDB.add("operations", {value: 2500, date: new Date, categoryId: 2})
    // localDB.add("operations", {value: 230, date: new Date, categoryId: 2})


    // localDB.add("operations", {value: -140, date: new Date, categoryId: 1})
    // localDB.add("operations", {value: -1300, date: new Date, categoryId: 2})
    // localDB.add("operations", {value: -250, date: new Date, categoryId: 3})
    // localDB.add("operations", {value: -1440, date: new Date, categoryId: 2})




    // localDB.add("income_categories", {name: "зарплата"})
    // localDB.add("income_categories", {name: "подработка"})



    // localDB.add("expens_categories", {name: "еда"})
    // localDB.add("expens_categories", {name: "топливо"})
    // localDB.add("expens_categories", {name: "парковка"})



    const fillTable = (htmlElement, dataArray, CategoriesDataArray) => {
        // console.log(dataArray)
        const tbody = htmlElement.querySelector('tbody');
        tbody.innerHTML = "";

        dataArray.forEach(data => {
            const row = document.createElement('tr');

            const category = CategoriesDataArray.find(category => category.id === data.categoryId);
            const date = new Date(data.date);

            row.innerHTML = `
            <td>${category?.name || 'Unknown'}</td>
            <td>${data.value}</td>
            <td>${addNul(date.getDate())}.${addNul(date.getMonth() + 1)}.${addNul(date.getFullYear())}</td>
            <td>
                <button>···</button>
            </td>`;

            row.querySelector('button').addEventListener("click", () => { showEditForm(data.id); });

            tbody.appendChild(row);
        });
    }

    fillTable(main_table_income, incomeData, incomeCategoriesData)
    fillTable(main_table_expens, expensData, expensCategoriesData)
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////////////////////////автоматическая работа с форомй

//установка значений в селекторе категорий
//categoryDataName = 'income_categories' || 'expens_categories'
async function updateSelectorValues(categoryDataName){
    let categoryDataArray = await localDB.getAll(categoryDataName)
    category_select.innerHTML = ''
    category_input.value = ''
    categoryDataArray.forEach(category => {
        category_select.innerHTML += `<option value="${category.name}"></option>`;
    });
    return
}

//установка дефолтных значений формы создания
function setDefaultValuesForAddForm(){
    const data = new Date
    date_selector.value = `${addNul(data.getFullYear())}-${addNul(data.getMonth())}-${addNul(data.getDate())}`
    value_input.value = ""
    value_input.classList.remove("err")
}

//установка значений по id операции для формы редактирования
async function setValuesForEditForm(id){
    const dataObject = await localDB.get("operations", id) 
    value_input.value = dataObject.value
    const isIncomeCategories = Boolean(dataObject.value > 0) 
    const categoryDataName = isIncomeCategories ? "income_categories" : "expens_categories"
    await updateSelectorValues(categoryDataName)
    const categoryData = await localDB.get(categoryDataName, dataObject.categoryId)
    category_input.value = categoryData.name
    date_selector.value =  `${addNul(dataObject.date.getFullYear())}-${addNul(dataObject.date.getMonth())}-${addNul(dataObject.date.getDate())}`
}

//проверка валидности формы
function isFormValid(){
    value_input.classList.remove("err")
    category_input.classList.remove("err")
    const isValueValid = (+value_input.value != 0)
    const isSelectorValid = (category_input.value)
    if(!isValueValid){ value_input.classList.add("err") }
    if(!isSelectorValid){ category_input.classList.add("err")}
    return isValueValid && isSelectorValid
}



///////////////////////////////////////////////////////////////////////////////////////////////////////////////ивенты

//показать окно с добавлением дохода
table_manager_button_income.addEventListener("click", async () => {
    await updateSelectorValues("income_categories")
    setDefaultValuesForAddForm()
    save_form_button.addEventListener("click", createIncomeOperation)
    create_form_container.style.visibility = 'visible'
})

//показать окно с добавлением расхода
table_manager_button_expens.addEventListener("click", async () => {
    await updateSelectorValues("expens_categories")
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
async function showEditForm(id){
    await setValuesForEditForm(id)
    create_form_container.style.visibility = 'visible'
}

////////////////////////////////////////////////////////////////////////////////////////////////////////создание операций

//ивент создания дохода
async function createIncomeOperation(){
    if(!isFormValid())return
    const value = +value_input.value
    const categoryId = await findIncomeCategory(category_input.value)
    createOperation(value, categoryId, new Date(date_selector.value))
}

//ивент создания расхода
async function createExpensOperation(){
    if(!isFormValid())return
    const value = +value_input.value * -1
    const categoryId = await findExpensCategory(category_input.value)
    createOperation(value, categoryId, new Date(date_selector.value))
}

//создание операции
async function createOperation(value, categoryId, date) {
    await localDB.add("operations", { value, date, categoryId });
    setDataForTable()
    clearEventsForSaveButton()
    create_form_container.style.visibility = 'hidden'
}

////////////////////////////////////////////////////////////////////////////////////////////////////////редактирование операций

//редактирование дохода
async function editIncomeOperation(params) {
    
}

//редактирование расхода
async function editExpensOperation(params) {
    
}

////////////////////////////////////////////////////////////////////////////////////////////////////////создание категорий

//если нету категории дохода, то создаёт
async function findIncomeCategory(name) {
    const incomeCategories = await localDB.getAll("income_categories")
    let   findCategoryId = incomeCategories.find(category => category.name === name)?.id
    if(!findCategoryId){
        findCategoryId = await localDB.add('income_categories', { name })
    }
    return findCategoryId
}

//если нету категории расхода, то создаёт
async function findExpensCategory(name) {
    const incomeCategories = await localDB.getAll("expens_categories")
    let   findCategoryId = incomeCategories.find(category => category.name === name)?.id
    if(!findCategoryId){
        findCategoryId = await localDB.add('expens_categories', { name })
    }
    return findCategoryId
}

//сброс ивента
function clearEventsForSaveButton(){
    save_form_button.removeEventListener("click", createIncomeOperation)
    save_form_button.removeEventListener("click", createExpensOperation)
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

function btnPress(id) {
    console.log(id)
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
const addNul = (number) => number < 9 ? `0${number}` : number