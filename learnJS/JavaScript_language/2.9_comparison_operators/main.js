
//Задание 1
const task1 = () => {
    let salar = {
        '1'  : (5 > 4),                 //true
        '2'  : ("ананас" > "яблоко"),   //false
        '3'  : ("2" > "12"),            //true?
        '4'  : (undefined == null),     //true
        '5'  : (undefined === null),    //false
        '6'  : (null == "\n0\n"),       //false?
        '7'  : (null === "\n0\n"),      //false
    }

    Object.keys(salar).forEach(key => {
        alert(`${key} : ${salar[key]}`)
    })
    
}





document.getElementById("run_task_1").addEventListener("click", task1)

