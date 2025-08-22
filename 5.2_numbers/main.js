
//Задание 1
const task1 = () =>{
    const a = +prompt("Введите a")
    const b = +prompt("Введите b")
    alert(a + b)
}

//Задание 2
const readNumber = () => {
    let number
    do{
        number = prompt("Введите число:", 0)
    }
    while(!isFinite(number))
    return +number
}

const task2 = () =>{
    readNumber()
    alert("Спасибо!")
}

//Задание 3
const random = (min, max) => {
    return (min + Math.random() * (max - min)).toFixed(0)
}

const task3 = () =>{
    alert( random(1, 5) )
    alert( random(1, 5) )
    alert( random(1, 5) )
}




document.getElementById("run_task_1").addEventListener("click", task1)
document.getElementById("run_task_2").addEventListener("click", task2)
document.getElementById("run_task_3").addEventListener("click", task3)





