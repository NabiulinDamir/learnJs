
//Задание 1
const task1 = () => {
    //else не нужен
}

//Задание 2
function checkAge(age){
    return (age > 18) ? true : confirm('Родители разрешили?');
}

function checkAge2(age){
    return (age > 18) || confirm('Родители разрешили?');
}

const task2 = () => {
    const age = prompt("Введите возраст:")
    alert(`Функция 1 вернула ${checkAge(age)}`)
    alert(`Функция 2 вернула ${checkAge2(age)}`)
}

//Задание 3
function min(a, b){
    return (a < b) ? a : b
}

const task3 = () => {
    const a = prompt("Введите a:")
    const b = prompt("Введите b:")
    alert(a + (a == min(a, b) ? " < " : " > ") + b)
}

//Задание 4
function pow(x, n){
    return x ** n
}

const task4 = () => {
    const x = prompt("Введите x:")
    const n = prompt("Введите n:")
    alert(`${x} возведенное в степень ${n} равно ${pow(x, n)}`)
}



document.getElementById("run_task_1").addEventListener("click", task1)
document.getElementById("run_task_2").addEventListener("click", task2)
document.getElementById("run_task_3").addEventListener("click", task3)
document.getElementById("run_task_4").addEventListener("click", task4)



