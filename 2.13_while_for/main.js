
//Задание 1
const task1 = () => {
    let i = 3;

    while (i) {
        alert( i-- ); //последнее значение 1
    }
}

//Задание 2
const task2 = () => {
    let i = 0;
    while (++i < 5) alert( i ); //1, 2, 3, 4


    i = 0;
    while (i++ < 5) alert( i ); //1, 2, 3, 4, 5

}

//Задание 3
const task3 = () => {
    for (let i = 0; i < 5; i++) alert( i ); //0, 1, 2, 3, 4

    for (let i = 0; i < 5; ++i) alert( i ); //0, 1, 2, 3, 4?
}

//Задание 4
const task4 = () => {
    for(let i = 2; i <= 10; i++){
        if(i % 2) continue
        alert(i)
    }
}

//Задание 5
const task5 = () => {
    let i = 0;
    while(i < 3){
        alert(`number ${i++}!`);
    }
}

//Задание 6
const task6 = () => {
    let num = 0;
    while(num < 100){
        num = prompt("Введите число больше 100")
    }
    if(num > 100) alert("Наконец то");
}

//Задание 7
const task7 = () => {
    let n = prompt("Введите верхнюю границу промежутка.")
    number:for (let i = 2; i < n; i++) {
        for (let j = 0; j < i; j++) {
            if((i % j === 0) && (i != j) && (j != 1)){
                continue number
            }
        }
        alert(i + " простое число.")
    }
}



document.getElementById("run_task_1").addEventListener("click", task1)
document.getElementById("run_task_2").addEventListener("click", task2)
document.getElementById("run_task_3").addEventListener("click", task3)
document.getElementById("run_task_4").addEventListener("click", task4)
document.getElementById("run_task_5").addEventListener("click", task5)
document.getElementById("run_task_6").addEventListener("click", task6)
document.getElementById("run_task_7").addEventListener("click", task7)



