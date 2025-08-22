
//Задание 1
const task1 = () => {
    alert( null || 2 || undefined ); //2
}

//Задание 2
const task2 = () => {
    alert( alert(1) || 2 || alert(3) ); //1 2?
}

//Задание 3
const task3 = () => {
    alert( 1 && null && 2 ); //nul
}

//Задание 4
const task4 = () => {
    alert( alert(1) && alert(2) ); //undefined
}

//Задание 5
const task5 = () => {
    alert( null || 2 && 3 || 4 ); //3
}

//Задание 6
const task6 = () => {
    let value = NaN;

    value &&= 10;
    value ||= 20;
    value &&= 30;
    value ||= 40;

    alert(value);//30
}

//Задание 7
const task7 = () => {
    const MAX_BORDER = 90
    const MIN_BORDER = 14
    let num = prompt("Введите число")
    alert(`Число ${num} ${(14 <= num && 90 >= num) ? "находится" : "не находится"} в диапазоне бла бла бла ${num}`)
}

//Задание 8
const task8 = () => {
    if (-1 || 0) alert( 'first' );          //Выполняется
    if (-1 && 0) alert( 'second' );         //Не выполняется
    if (null || -1 && 1) alert( 'third' );  //Выполняется
}

//Задание 9
const task9 = () => {
    let user = prompt("Кто там?");
    let pass;
    if(user.toLowerCase() === "админ"){
        pass = prompt("Введите пароль:")
        if(pass === "Я главный"){
            alert("Здравствуйте!");
        }
        else{
            alert("Неверный пароль!");
        }
    }
    else{
        alert("Я вас не знаю(")
    }
}





document.getElementById("run_task_1").addEventListener("click", task1)
document.getElementById("run_task_2").addEventListener("click", task2)
document.getElementById("run_task_3").addEventListener("click", task3)
document.getElementById("run_task_4").addEventListener("click", task4)
document.getElementById("run_task_5").addEventListener("click", task5)
document.getElementById("run_task_6").addEventListener("click", task6)
document.getElementById("run_task_7").addEventListener("click", task7)



