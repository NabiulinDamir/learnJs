
//Задание 1
const task1 = () =>{
    let user = { name: "John", years: 30 };

    
    let {name, years: age, isAdmin = false} = user

    alert( name ); // John
    alert( age ); // 30
    alert( isAdmin ); // false
}

//Задание 2
const topSalary = (salaries) => {
    let max = 0;
    let maxName = null;

    for(const [name, salary] of Object.entries(salaries)) {
        if (max < salary) {
            max = salary;
            maxName = name;
        }
    }

    return maxName;
}

const task2 = () =>{
    let salaries = {
        "John": 100,
        "Pete": 300,
        "Mary": 250
    };
    alert(topSalary(salaries))
}






document.getElementById("run_task_1").addEventListener("click", task1)
document.getElementById("run_task_2").addEventListener("click", task2)






