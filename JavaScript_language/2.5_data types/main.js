//Задание 1
const task1 = () => {
    let name = "Ilya";

    alert( `hello ${1}` ); // hello 1

    alert( `hello ${"name"}` ); // hello name

    alert( `hello ${name}` ); // hello Ilya
}



document.getElementById("run_task_1").addEventListener("click", task1)
