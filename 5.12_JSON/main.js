
//Задание 1
const task1 = () =>{
    let user = {
        name: "Василий Иванович",
        age: 35
    };
    const data = JSON.stringify(user)

    alert(data)

    const newObj = JSON.parse(data)

    console.log(newObj)
    alert("Вывод в консоли")
}

//Задание 2
const task2 = () =>{
    let room = {
        number: 23
    };

    let meetup = {
        title: "Совещание",
        occupiedBy: [{name: "Иванов"}, {name: "Петров"}],
        place: room
    };

    room.occupiedBy = meetup;
    meetup.self = meetup;

    alert( JSON.stringify(meetup, function replacer(key, value) { return (key != "" && value == meetup) ? undefined : value; }));

}






document.getElementById("run_task_1").addEventListener("click", task1)
document.getElementById("run_task_2").addEventListener("click", task2)





