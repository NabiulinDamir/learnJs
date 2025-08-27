
//Задание 1
function makeUser() {
  return {
    name: "John",
    ref: this
  };
}

const task1 = () =>{
    let user = makeUser();

    alert( "Результат: " + user.ref.name ); // Каким будет результат? //ошибка
}

//Задание 2

let calculator = {
  read() {
    this.a = +prompt('Введите a:');
    this.b = +prompt('Введите b:');
  },
  sum() {
    return this.a + this.b;
  },
  mul() {
    return this.a * this.b;
  },
};

const task2 = () =>{
    calculator.read();
    alert( calculator.sum() );
    alert( calculator.mul() );
}

//Задание 3
let ladder = {
    step: 0,
    up() {
        this.step++;
        return this;
    },
    down() {
        this.step--;
        return this;
    },
    showStep: function() {
        alert( this.step );
        return this;
    }
};

const task3 = () =>{
    ladder.up().up().down().showStep().down().showStep();
}




document.getElementById("run_task_1").addEventListener("click", task1)
document.getElementById("run_task_2").addEventListener("click", task2)
document.getElementById("run_task_3").addEventListener("click", task3)





