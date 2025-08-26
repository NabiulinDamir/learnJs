
//Задание 1
async function loadJson(url) {
    const response = await fetch(url)
    if (response.status == 200) {
        return response.json();
    } 
    else {
        throw new Error(response.status);
    }
}


const task1 = () =>{
    loadJson('no-such-user.json').catch(alert); // Error: 404
}

//Задание 2

const task2 = () =>{

}

//Задание 3
const task3 = () =>{
    
}




document.getElementById("run_task_1").addEventListener("click", task1)
document.getElementById("run_task_2").addEventListener("click", task2)
document.getElementById("run_task_3").addEventListener("click", task3)





