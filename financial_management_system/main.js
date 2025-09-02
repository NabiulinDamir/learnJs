import localDB from './db.js'


setDataForTable()
async function setDataForTable() {
    let incomeData = await localDB.getAll("income")
    let expensData = await localDB.getAll("expens")
    let incomeCategoriesData = await localDB.getAll("income_categories")
    let expensCategoriesData = await localDB.getAll("expens_categories")

    // localDB.add("income", {value: 140, date: new Date, categoryId: 1})
    // localDB.add("income", {value: 2500, date: new Date, categoryId: 2})
    // localDB.add("income", {value: 230, date: new Date, categoryId: 2})


    // localDB.add("expens", {value: 140, date: new Date, categoryId: 1})
    // localDB.add("expens", {value: 1300, date: new Date, categoryId: 2})
    // localDB.add("expens", {value: 250, date: new Date, categoryId: 3})
    // localDB.add("expens", {value: 1440, date: new Date, categoryId: 2})




    // localDB.add("income_categories", {name: "зарплата"})
    // localDB.add("income_categories", {name: "подработка"})



    // localDB.add("expens_categories", {name: "еда"})
    // localDB.add("expens_categories", {name: "топливо"})
    // localDB.add("expens_categories", {name: "парковка"})



    const fillTable = (htmlElement, dataArray, CategoriesDataArray) => {
        htmlElement.querySelector('tbody').innerHTML = ""
        dataArray.forEach(data => {
            htmlElement.querySelector('tbody').innerHTML +=
                `<tr>
            <td>0</td>
            <td>${CategoriesDataArray.find(category => category.id === data.categoryId).name}</td>
            <td>${data.value}</td>
            <td>${addNul(data.date.getDate())}.${addNul(data.date.getMonth())}.${addNul(data.date.getFullYear())}</td>
        </tr>`
        });
    }

    fillTable(main_table_income, incomeData, incomeCategoriesData)
    fillTable(main_table_expens, expensData, expensCategoriesData)
}



///////////////////////////////////////////////////////////////////////////////////////////////////////////////
let interactionObjectName = ""
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

const updateSelectorValues = async (categoryDataName) => {
    let categoryDataArray = await localDB.getAll(categoryDataName)
    category_select.innerHTML = ''
    category_input.value = ''
    categoryDataArray.forEach(category => {
        console.log(category.name)
        category_select.innerHTML += `<option value="${category.id}">${category.name}</option>`;
    });

}

const updateFrame = () => {
    const data = new Date
    date_selector.value = `${addNul(data.getFullYear())}-${addNul(data.getMonth())}-${addNul(data.getDate())}`
    value_input.value = ""
    value_input.classList.remove("err")
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

table_manager_button_income.addEventListener("click", async () => {
    await updateSelectorValues("income_categories")
    updateFrame()
    interactionObjectName = "income"
    prompt_form_container.style.visibility = 'visible'
})

table_manager_button_expens.addEventListener("click", async () => {
    await updateSelectorValues("expens_categories")
    updateFrame()
    interactionObjectName = "expens"
    prompt_form_container.style.visibility = 'visible'
})

hide_form_button.addEventListener("click", () => {
    prompt_form_container.style.visibility = 'hidden'
})

save_form_button.addEventListener("click", () => {
    const value =       value_input.value
    const categoryId =  category_input.value
    const date =        new Date(date_selector.value)
    switch (interactionObjectName) {
        case "income":
        case "expens":
            //localDB.add(interactionObjectName, {value, categoryId, date}); ту число!!!!
            break
        case "":
            break
        case "":
            break
    }

    if (value) {
        console.log({value, categoryId, date })
        prompt_form_container.style.visibility = 'hidden'
    }
    else {
        value_input.classList.add("err")
    }
})

///////////////////////////////////////////////////////////////////////////////////////////////////////////////





///////////////////////////////////////////////////////////////////////////////////////////////////////////////
const addNul = (number) => number < 9 ? `0${number}` : number