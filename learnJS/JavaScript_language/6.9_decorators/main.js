
//Задание 1
function spy(func){
    function wrapper(...args) {
        wrapper.history.push(args);


        return func.apply(this, args);
    }
    wrapper.history = [];

    return wrapper;
}

function work(a, b) {
  alert( a + b ); // произвольная функция или метод
}

const task1 = () =>{
    work = spy(work);

    work(1, 2); // 3
    work(4, 5); // 9

    for (let args of work.calls) {
        alert( 'call:' + args.join() ); // "call:1,2", "call:4,5"
    }
}

//Задание 2
const task2 = () =>{

}

//Задание 3
const task3 = () =>{
    
}

//Задание 4
const task4 = () =>{
    
}




document.getElementById("run_task_1").addEventListener("click", task1)
document.getElementById("run_task_2").addEventListener("click", task2)
document.getElementById("run_task_3").addEventListener("click", task3)
document.getElementById("run_task_4").addEventListener("click", task4)





