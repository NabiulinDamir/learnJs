
//Задание 1
const task1 = () =>{
    alert(`
        ${document.body.firstElementChild.textContent}
        ${document.body.children[1].firstElementChild.textContent}
        ${document.body.children[1].lastElementChild.textContent}
    `)
}

//Задание 2
const task2 = () =>{
    alert("Нету")
}

//Задание 3
const task3 = () =>{
    const table = document.body.children[2]

    for (let i = 0; i < table.rows.length; i++) {
        let row = table.rows[i];
        row.cells[i].style.backgroundColor = 'red';
    }

}




document.getElementById("run_task_1").addEventListener("click", task1)
document.getElementById("run_task_2").addEventListener("click", task2)
document.getElementById("run_task_3").addEventListener("click", task3)





