
//Задание 1

const ask = (question, yes, no) => {
    if(confirm(question)) {
        yes()
    } 
    else {
        no()
    }
}

const task1 = () => {
    ask(
        "Вы согласны?",
        () => { alert("Вы согласились.") },
        () => { alert("Вы отменили выполнение."); }
    )
}



document.getElementById("run_task_1").addEventListener("click", task1)




