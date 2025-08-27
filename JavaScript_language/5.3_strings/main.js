
//Задание 1

const ucFirst = (str) => {
    return str[0].toUpperCase() + str.substr(1, str.length-1)
}

const task1 = () =>{
    alert(ucFirst("вася") == "Вася")
}

//Задание 2
const checkSpam = (str) => {
    const FORBIDDEN_WORDS = ["viagra", "XXX"]
    for(word of FORBIDDEN_WORDS){
        if(str.toUpperCase().includes(word.toUpperCase())) return true
    }
    return false

}

const task2 = () =>{
    alert(checkSpam('buy ViAgRA now'))  //true
    alert(checkSpam('free xxxxx'))      //true
    alert(checkSpam("innocent rabbit")) //false
}

//Задание 3
const truncate = (str, maxlength) => {
    return str.slice(0, maxlength-1) + (str.length > maxlength ? "..." : "")
}

const task3 = () => {
    alert(truncate("Вот, что мне хотелось бы сказать на эту тему:", 20)) //"Вот, что мне хотело…"
    alert(truncate("Всем привет!", 20)) //Всем привет!"
}

//Задание 4
const extractCurrencyValue = (str) => {
    return +str.slice(1);
}

const task4 = () => {
    alert( extractCurrencyValue('$120') === 120 ); // true
}

document.getElementById("run_task_1").addEventListener("click", task1)
document.getElementById("run_task_2").addEventListener("click", task2)
document.getElementById("run_task_3").addEventListener("click", task3)
document.getElementById("run_task_4").addEventListener("click", task4)





