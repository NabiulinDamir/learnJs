//Задание 1

const task1 = () => {
    const result = prompt("Введите имя", ["Иван"]);
    alert(`Ваше имя ${result}`)
}



document.getElementById("run_task_1").addEventListener("click", task1)
