
//Задание 1
const task1 = () =>{
    const lis = document.querySelectorAll('li')
    for(text of lis){
        alert(`Текст: ${text.firstChild.data}\nЧисло потомков: ${text.children.length} `)

    }
}






document.getElementById("run_task_1").addEventListener("click", task1)






