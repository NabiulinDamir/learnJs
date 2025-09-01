

//Задание 2
function delay(ms) {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(), ms)
    })
}

const task2 = () =>{
    delay(3000).then(() => alert('выполнилось через 3 секунды'));
}






document.getElementById("run_task_2").addEventListener("click", task2)






