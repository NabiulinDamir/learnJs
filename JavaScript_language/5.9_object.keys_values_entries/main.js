
//Задание 1
const sumSalaries = (salaries) => {
    let sum = 0
    for(let value of Object.values(salaries)){
        sum += value
    }
    return sum
} 

const task1 = () =>{
    let salaries = {
        "John": 100,
        "Pete": 300,
        "Mary": 250
    };

    alert( sumSalaries(salaries) ); // 650
}

//Задание 2
const count = (obj) => {
    return Object.keys(obj).length
}

const task2 = () =>{
    let user = {
        name: 'John',
        age: 30
    };

    alert( count(user) ); // 2
}






document.getElementById("run_task_1").addEventListener("click", task1)
document.getElementById("run_task_2").addEventListener("click", task2)






