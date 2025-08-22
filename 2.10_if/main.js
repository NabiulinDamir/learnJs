
//Задание 1
const task1 = () => {
    if ("0") {
        alert( 'Привет' );
    }
    //условие выведется
}

//Задание 2
const task2 = () => {
    let name = prompt("Какое официальное название JS? (ECMA...Script)");
    if (name === "ECMAScript") {
        alert( 'Верно!' );
    }
    else{
        alert("Не знаете? ECMAScript!");
    }
}

//Задание 3
const task3 = () => {
    let num = prompt("Введите какое то число")
    if(num > 0)          { alert(1) }
    else if(num < 0)     { alert(-1)}
    else if(num == 0)    { alert(0) }
}

//Задание 4
const task4 = () => {
    let result = ((3 + 2 < 4) ? "Мало" : "Много");
    alert(result);
}

//Задание 5
const task5 = () => {
    let message;
    let login = prompt("Введите логин")
    message =    (login == 'Сотрудник') ? 'Привет'
               : (login == 'Директор')  ? 'Здравствуйте'
               : (login == '')          ? 'Нет логина' 
               : ''
    alert(message)

}


document.getElementById("run_task_1").addEventListener("click", task1)
document.getElementById("run_task_2").addEventListener("click", task2)
document.getElementById("run_task_3").addEventListener("click", task3)
document.getElementById("run_task_4").addEventListener("click", task4)
document.getElementById("run_task_5").addEventListener("click", task5)

