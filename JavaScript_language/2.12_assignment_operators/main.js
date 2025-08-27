
//Задание 1
const task1 = () => {
    alert(undefined ?? NaN ?? null ?? "" ?? ""); //NaN
}

//Задание 2
const task2 = () => {
    let city = null;
    city ??= "Берлин";
    city ??= null;
    city ??= "Кёльн";
    city ??= "Гамбург";

    alert(city)//Берлин
}

//Задание 3
const task3 = () => {
    let num1 = 10,
        num2 = 20,
        result;

    result ??= (num1 ?? num2)

    alert(result)


}



document.getElementById("run_task_1").addEventListener("click", task1)
document.getElementById("run_task_2").addEventListener("click", task2)
document.getElementById("run_task_3").addEventListener("click", task3)


