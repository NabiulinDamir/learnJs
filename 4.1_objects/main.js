
//Задание 1
const task1 = () =>{
    let user = {}
    user.name = "John"
    user.surname = "Smith"
    user.name = "Pete"
    delete user.name
}

//Задание 2

const isEmptyObject = (object) =>{
    for(key in object){
        return false
    }
    return true
}

const task2 = () =>{
    let schedule = {};

    alert( isEmptyObject(schedule) ); // true

    schedule["8:30"] = "get up";

    alert( isEmptyObject(schedule) ); // false
}

//Задание 3
const sumSalarie = (obj) =>{
    let summ = 0
    for(key in obj){
        summ += obj[key]
    }
    return summ
}

const task3 = () =>{
    let salaries = {
        John: 100,
        Ann: 160,
        Pete: 130
    }
    alert(sumSalarie(salaries))
}

//Задание 4
const multiplyNumeric = (obj) =>{
    const MULTIPLE_VALUE = 2
    for(key in obj){
        if((typeof obj[key]) == 'number'){
            obj[key] *= MULTIPLE_VALUE
        }
    }
    return obj
}

const task4 = () =>{
    let menu = {
        width: 200,
        height: 300,
        title: "My menu"
    };
    menu = multiplyNumeric(menu)
    for(key in menu){
        alert(`${key}: ${menu[key]}`)
    }
    
}


document.getElementById("run_task_1").addEventListener("click", task1)
document.getElementById("run_task_2").addEventListener("click", task2)
document.getElementById("run_task_3").addEventListener("click", task3)
document.getElementById("run_task_4").addEventListener("click", task4)




