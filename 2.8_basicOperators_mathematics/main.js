
//Задание 1
const task1 = () => {
    let a = 1, b = 1;
    let c = ++a; // 2
    let d = b++; // 1
    alert(c + " " + d)
}

//Задание 2
const task2 = () => {
    let a = 2;
    let x = 1 + (a *= 2); //5
    alert(x)
}

//Задание 3
const task3 = () => {
    let salar = {
        '1'  : ("" + 1 + 0    ), //10
        '2'  : ("" - 1 + 0    ), //-1
        '3'  : (true + false  ), //1
        '4'  : (6 / "3"       ), //2
        '5'  : ("2" * "3"     ), //6
        '6'  : (4 + 5 + "px"  ), //9px
        '7'  : ("$" + 4 + 5   ), //$45
        '8'  : ("4" - 2       ), //2
        '9'  : ("4px" - 2     ), //Nan
        '10' : ( "  -9  " + 5 ), //-9  5
        '11' : ( "  -9  " - 5 ), //-14
        '12' : ( null + 1     ), //Nan
        '13' : ( undefined + 1), //Nan
        '14' : ( " \t \n" - 2 ), //-2
    }

    Object.keys(salar).forEach(key => {
        alert(`${key} : ${salar[key]}`)
    })
    
}

//Задание 4
const task4 = () => {
    let a = prompt("Первое число?", 1);
    let b = prompt("Второе число?", 2);

    alert(+a + +b); // 12 стало 3
}



document.getElementById("run_task_1").addEventListener("click", task1)
document.getElementById("run_task_2").addEventListener("click", task2)
document.getElementById("run_task_3").addEventListener("click", task3)
document.getElementById("run_task_4").addEventListener("click", task4)
