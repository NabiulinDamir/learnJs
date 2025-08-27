
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

class HttpError extends Error {
  constructor(response) {
    super(`${response.status} for ${response.url}`);
    this.name = 'HttpError';
    this.response = response;
  }
}

async function loadJson(url) {
    const response = await fetch(url)
    if (response.status == 200) {
        return response.json()
    } else {
        throw new HttpError(response);
    }
    
}

async function demoGithubUser() {
    let name = prompt("Введите логин?", "iliakan");
    try{
        const user = await loadJson(`https://api.github.com/users/${name}`)
        alert(`Полное имя: ${user.name}.`);
        return user;
    }
    catch(err){
        if (err instanceof HttpError && err.response.status == 404) {
            alert("Такого пользователя не существует, пожалуйста, повторите ввод.");
            return demoGithubUser();
        } 
        else {
            throw err;
        }
    }
}

const task2 = () =>{
    demoGithubUser();
}

//Задание 3

async function wait() {
  await new Promise(resolve => setTimeout(resolve, 1000));

  return 10;
}

function f() {
    wait().then(result => alert(result));
}

const task3 = () =>{
    f()
}




document.getElementById("run_task_1").addEventListener("click", task1)
document.getElementById("run_task_2").addEventListener("click", task2)
document.getElementById("run_task_3").addEventListener("click", task3)





