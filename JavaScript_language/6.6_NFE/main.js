
//Задание 1
function makeCounter() {

}

const task1 = () =>{

}

//Задание 2
function sum(a) {

  let currentSum = a;

  function f(b) {
    currentSum += b;
    return f;
  }

  f.toString = function() {
    return currentSum;
  };

  return f;
}


const task2 = () =>{
    alert(sum(1)(2)) //== 3; // 1 + 2
    alert(sum(1)(2)(3)) //== 6; // 1 + 2 + 3
    alert(sum(5)(-1)(2)) //== 6
    alert(sum(6)(-1)(-2)(-3)) //== 0
    alert(sum(0)(1)(2)(3)(4)(5)) //== 15

}
 setTimeout 




document.getElementById("run_task_1").addEventListener("click", task1)
document.getElementById("run_task_2").addEventListener("click", task2)
document.getElementById("run_task_3").addEventListener("click", task3)





