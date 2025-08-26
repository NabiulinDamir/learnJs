
//Задание 1

let isTimerRun = false
let interwalId
const task1 = () => {
    if(!isTimerRun){
        interwalId = setInterval(() => {
            console.log(new Date())
        },1000)
        alert("Start")
    }
    else{
        clearInterval(interwalId)
        alert("Stop")
    }
    isTimerRun = !isTimerRun
    
}

//Задание 2
const task2 = () =>{
    let i = 0;

    setTimeout(() => alert(i), 100); // 100000000

    // предположим, что время выполнения этой функции >100 мс
    for(let j = 0; j < 100000000; j++) {
        i++;
    }
}





document.getElementById("run_task_1").addEventListener("click", task1)
document.getElementById("run_task_2").addEventListener("click", task2)






