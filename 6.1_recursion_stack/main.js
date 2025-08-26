
//Задание 1
const sumTo = (num) => {
    if(num) return num + sumTo(num - 1)
    return num
}

const task1 = () =>{
    alert(sumTo(1))  // = 1
    alert(sumTo(2))  // = 2 + 1 = 3
    alert(sumTo(3))  // = 3 + 2 + 1 = 6
    alert(sumTo(4))  // = 4 + 3 + 2 + 1 = 10
    alert(sumTo(100))// = 100 + 99 + ... + 2 + 1 = 5050
}

//Задание 2
const factorial = (n) => {
  return n ? n * factorial(n - 1) : 1;
}

const task2 = () =>{
    alert( factorial(5) ); // 120
}

//Задание 3
const fib = (n) => {
  let a = 1;
  let b = 1;
  for (let i = 3; i <= n; i++) {
    let c = a + b;
    a = b;
    b = c;
  }
  return b;
}

const task3 = () =>{
    alert( fib(3) ); // 2
    alert( fib(7) ); // 13
    alert( fib(77) ); // 5527939700884757
}

//Задание 4
const printList = (list) => {
    alert(list.value)
    if(list.next){printList(list.next)}
}

const task4 = () =>{
    let list = {
        value: 1,
        next: {
            value: 2,
            next: {
                value: 3,
                next: {
                    value: 4,
                    next: null
                }
            }
        }
    };
    printList(list)
}

//Задание 5
const printListRevers = (list) => {
    if(list.next){printListRevers(list.next)}
    alert(list.value)
}


const task5 = () =>{
    let list = {
        value: 1,
        next: {
            value: 2,
            next: {
                value: 3,
                next: {
                    value: 4,
                    next: null
                }
            }
        }
    };    
    printListRevers(list)
}




document.getElementById("run_task_1").addEventListener("click", task1)
document.getElementById("run_task_2").addEventListener("click", task2)
document.getElementById("run_task_3").addEventListener("click", task3)
document.getElementById("run_task_4").addEventListener("click", task4)
document.getElementById("run_task_5").addEventListener("click", task5)






