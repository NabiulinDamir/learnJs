
//Задание 1
const task1 = () =>{
    let fruits = ["Яблоки", "Груша", "Апельсин"];

    // добавляем новое значение в "копию"
    let shoppingCart = fruits;
    shoppingCart.push("Банан");

    // что в fruits?
    alert( fruits.length ); // 4
}

//Задание 2
const task2 = () =>{
    let styles = ["Джаз", "Блюз"]
    alert(styles)
    styles.push("Рок-н-ролл")
    alert(styles)
    styles[Math.floor(styles.length / 2)] = "Классика"
    alert(styles)
    styles.shift()
    alert(styles)
    styles.unshift("Рэп", "Регги")
    alert(styles)
}

//Задание 3
const task3 = () =>{
    let arr = ["a", "b"];

    arr.push(function() {
        alert( this );
    });

    arr[2](); // кто так вообще делает??

}

//Задание 4
const sumInput = () => {
    let tmp;
    let numMas = [];
    do{
        tmp = prompt("Введите число", 0)
        if(isFinite(tmp)) numMas.push(+tmp)
    }while(isFinite(tmp) && tmp)
    
    let sum = 0
    for(num of numMas){
        sum += num
    }
    return sum
}

const task4 = () =>{
    alert(sumInput())
}



//Задание 5
const getMaxSubSum = (arr) =>{
    let maxSum = 0
    for (let i = 0; i < arr.length; i++) {
        for (let j = i; j < arr.length; j++) {
            
        }
    }
    //доделать
    //нужно меньше вложенности
}

const task5 = () =>{
    alert(getMaxSubSum([-1, 2, 3, -9]))         // 5 
    alert(getMaxSubSum([2, -1, 2, 3, -9]))      // 6
    alert(getMaxSubSum([-1, 2, 3, -9, 11]))     // 11
    alert(getMaxSubSum([-2, -1, 1, 2]))         // 3
    alert(getMaxSubSum([100, -9, 2, -3, 5]))    // 100
    alert(getMaxSubSum([1, 2, 3]))              // 6 
}




document.getElementById("run_task_1").addEventListener("click", task1)
document.getElementById("run_task_2").addEventListener("click", task2)
document.getElementById("run_task_3").addEventListener("click", task3)
document.getElementById("run_task_4").addEventListener("click", task4)
document.getElementById("run_task_5").addEventListener("click", task5)





