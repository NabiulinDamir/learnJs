//Задание 1
const task1 = () => {
    let admin, Name;
    Name = "Джон";
    admin = Name;
    alert(admin);
}

//Задание 2
const task2 = () => {
    planetName = "earth" //придумать переменную для названия планеты
    user_name = "Damir"  //придумать переменную для имени пользователя
    alert("Названия переменных: planetName, user_name")
}



document.getElementById("run_task_1").addEventListener("click", task1)
document.getElementById("run_task_2").addEventListener("click", task2)
