
//Задание 1
const unique = (arr) => {
    
    return Array.from(new Set(arr))

}

const task1 = () =>{
    let values = ["Hare", "Krishna", "Hare", "Krishna","Krishna", "Krishna", "Hare", "Hare", ":-O"];

    alert( unique(values) ); // Hare,Krishna,:-O
}

//Задание 2
const aclean = (arr) => {
    let obj = {};

    for (let i = 0; i < arr.length; i++) {
        let sorted = arr[i]
            .toLowerCase()
            .split("")
            .sort()
            .join("");
        obj[sorted] = arr[i];
    }

    return Object.values(obj);
}

const task2 = () =>{
    let arr = ["nap", "teachers", "cheaters", "PAN", "ear", "era", "hectares"];

    alert( aclean(arr) ); // "nap,teachers,ear" или "PAN,cheaters,era"
}

//Задание 3
const task3 = () =>{
    let map = new Map();

    map.set("name", "John");

    let keys = Array.from(map.keys());


    keys.push("more");

    alert(keys)
}




document.getElementById("run_task_1").addEventListener("click", task1)
document.getElementById("run_task_2").addEventListener("click", task2)
document.getElementById("run_task_3").addEventListener("click", task3)





