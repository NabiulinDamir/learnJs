
//Задание 1
const camelize = (str) => {
    let tmpStr = str.split('-')
    let startMas = tmpStr[0]
    let endMas = tmpStr.slice(1).map(element => (element[0]?.toUpperCase() ?? "") + element.slice(1))
    return startMas.concat(endMas.join(""))

}

const task1 = () =>{
    alert(camelize("background-color"));
    alert(camelize("list-style-image"));
    alert(camelize("-webkit-transition"));
}

//Задание 2
const filterRange = (arr, a, b) => {
    return arr.filter(d => (d >= a) && (d <= b))
}

const task2 = () =>{
    let arr = [5, 3, 8, 1];

    let filtered = filterRange(arr, 1, 4);

    alert( filtered ); // 3,1 (совпадающие значения)

    alert( arr ); // 5,3,8,1 (без изменений)
}

//Задание 3
const filterRangeInPlace = (arr, a, b) => {
    return arr.filter(d => (d >= a) && (d <= b))
}

const task3 = () =>{
    let arr = [5, 3, 8, 1];

    arr = filterRangeInPlace(arr, 1, 4); // удалены числа вне диапазона 1..4

    alert( arr ); // [3, 1]
}

//Задание 4
const task4 = () =>{
    let arr = [5, 2, 1, -10, 8];

    arr.sort((a, b) => (b - a))

    alert( arr ); // 8, 5, 2, 1, -10
}

//Задание 5
const copySorted = (arr) => {
    let newArr = []
    for(data of arr){
        newArr.push(data)
    }
    return newArr.sort()

}

const task5 = () =>{
    let arr = ["HTML", "JavaScript", "CSS"];

    let sorted = copySorted(arr);

    alert( sorted ); // CSS, HTML, JavaScript
    alert( arr ); // HTML, JavaScript, CSS (без изменений)
}

//Задание 6
function Calculator() {

  this.methods = {
    "-": (a, b) => a - b,
    "+": (a, b) => a + b
  };

  this.calculate = function(str) {

    let split = str.split(' '),
      a = +split[0],
      op = split[1],
      b = +split[2]

    if (!this.methods[op] || isNaN(a) || isNaN(b)) {
      return NaN;
    }

    return this.methods[op](a, b);
  }

  this.addMethod = function(name, func) {
    this.methods[name] = func;
  };
}

const task6 = () =>{
    let powerCalc = new Calculator;
    powerCalc.addMethod("*", (a, b) => a * b);
    powerCalc.addMethod("/", (a, b) => a / b);
    powerCalc.addMethod("**", (a, b) => a ** b);

    let result = powerCalc.calculate("2 ** 3");
    alert( result ); // 8
}
//Задание 7
const task7 = () =>{
    let vasya = { name: "Вася", age: 25 };
    let petya = { name: "Петя", age: 30 };
    let masha = { name: "Маша", age: 28 };

    let users = [ vasya, petya, masha ];

    let names = users.map(user => user.name)

    alert( names ); // Вася, Петя, Маша
}

//Задание 8
const task8 = () =>{
    let vasya = { name: "Вася", surname: "Пупкин", id: 1 };
    let petya = { name: "Петя", surname: "Иванов", id: 2 };
    let masha = { name: "Маша", surname: "Петрова", id: 3 };

    let users = [ vasya, petya, masha ];

    let usersMapped = users.map(user => ({fullName: (`${user.name} ${user.surname}`), id: user.id}))

    /*
    usersMapped = [
    { fullName: "Вася Пупкин", id: 1 },
    { fullName: "Петя Иванов", id: 2 },
    { fullName: "Маша Петрова", id: 3 }
    ]
    */

    alert( usersMapped[0].id ) // 1
    alert( usersMapped[0].fullName ) // Вася Пупкин
}

//Задание 9
const sortByAge = (arr) => {
    arr.sort((a, b) => (a.age - b.age))
}

const task9 = () =>{
    let vasya = { name: "Вася", age: 25 };
    let petya = { name: "Петя", age: 30 };
    let masha = { name: "Маша", age: 28 };

    let arr = [ vasya, petya, masha ];

    sortByAge(arr);

    // теперь: [vasya, masha, petya]
    alert(arr[0].name); // Вася
    alert(arr[1].name); // Маша
    alert(arr[2].name); // Петя
}
//Задание 10
// const shuffle = (array) => {
//     for(let i = 0; i < array.length-1; i++){
//         if((Math.random() - 0.5) > 0){
//             [array[i], array[i+1]] = [array[i+1], array[i]]
//         }
//     }
// }
// 123: 249472
// 132: 250868
// 213: 250058
// 231: 249602
// 312: 0
// 321: 0

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1)); // случайный индекс от 0 до i

    // поменять элементы местами
    // мы используем для этого синтаксис "деструктурирующее присваивание"
    // подробнее о нём - в следующих главах
    // то же самое можно записать как:
    // let t = array[i]; array[i] = array[j]; array[j] = t
    [array[i], array[j]] = [array[j], array[i]];
  }
}


const task10 = () =>{
    // подсчёт вероятности для всех возможных вариантов
    let count = {
        '123': 0,
        '132': 0,
        '213': 0,
        '231': 0,
        '321': 0,
        '312': 0
    };

    for (let i = 0; i < 1000000; i++) {
        let array = [1, 2, 3];
        shuffle(array);
        count[array.join('')]++;
    }

    // показать количество всех возможных вариантов
    for (let key in count) {
        console.log(`${key}: ${count[key]}`);
    }
}

//Задание 11
const getAverageAge = (users) => {
    return users.reduce((sum, item) => sum + item.age, 0) / users.length
}

const task11 = () =>{
    let vasya = { name: "Вася", age: 25 };
    let petya = { name: "Петя", age: 30 };
    let masha = { name: "Маша", age: 29 };

    let arr = [ vasya, petya, masha ];

    alert( getAverageAge(arr) ); // (25 + 30 + 29) / 3 = 28
}

//Задание 12
const unique = (arr) => {
    let mas = []
    for(item of arr){
        if(!(mas.includes(item))){
            mas.push(item)
        }
    }
    return mas
}

const task12 = () =>{
    let strings = ["кришна", "кришна", "харе", "харе","харе", "харе", "кришна", "кришна", ":-O"];

    alert( unique(strings) ); // кришна, харе, :-O
}

//Задание 13
const groupById = (arr) => {
      return arr.reduce((obj, value) => { obj[value.id] = value; return obj; }, {})
}

const task13 = () =>{
    let users = [
        {id: 'john', name: "John Smith", age: 20},
        {id: 'ann', name: "Ann Smith", age: 24},
        {id: 'pete', name: "Pete Peterson", age: 31},
    ];

    let usersById = groupById(users);

    console.log(usersById)
    alert("Вывод в консоли")
    /*
    после вызова у нас должно получиться:

    usersById = {
    john: {id: 'john', name: "John Smith", age: 20},
    ann: {id: 'ann', name: "Ann Smith", age: 24},
    pete: {id: 'pete', name: "Pete Peterson", age: 31},
    }
    */
}



document.getElementById("run_task_1").addEventListener("click", task1)
document.getElementById("run_task_2").addEventListener("click", task2)
document.getElementById("run_task_3").addEventListener("click", task3)
document.getElementById("run_task_4").addEventListener("click", task4)
document.getElementById("run_task_5").addEventListener("click", task5)
document.getElementById("run_task_6").addEventListener("click", task6)
document.getElementById("run_task_7").addEventListener("click", task7)
document.getElementById("run_task_8").addEventListener("click", task8)
document.getElementById("run_task_9").addEventListener("click", task9)
document.getElementById("run_task_10").addEventListener("click", task10)
document.getElementById("run_task_11").addEventListener("click", task11)
document.getElementById("run_task_12").addEventListener("click", task12)
document.getElementById("run_task_13").addEventListener("click", task13)




