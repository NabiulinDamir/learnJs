
//Задание 1
const task1 = () =>{
    const date = new Date("2012-02-20T15:12")

    alert(date)
}

//Задание 2
const getWeekDay = (date) => {
    const DAYS_OF_WEEK = ["ВС", "ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ"]
    
    return DAYS_OF_WEEK[date.getDay()]
}

const task2 = () =>{
    let date = new Date(2012, 0, 3);  // 3 января 2012 года
    alert( getWeekDay(date) );    
}

//Задание 3
const getLocalDay = (date) => {
  let day = date.getDay();

  day ??= 7 

  return day;
}

const task3 = () =>{
    let date = new Date(2012, 0, 3);  // 3 января 2012 года
    alert( getLocalDay(date) );       // вторник, нужно показать 2
}

//Задание 4
const getDateAgo = (date, days) => {
    let newDate = new Date(date)
    newDate.setDate(date.getDate() - days);
    return newDate.getDate();
}

const task4 = () =>{
    let date = new Date(2015, 0, 2);

    alert( getDateAgo(date, 1) ); // 1, (1 Jan 2015)
    alert( getDateAgo(date, 2) ); // 31, (31 Dec 2014)
    alert( getDateAgo(date, 365) ); // 2, (2 Jan 2014)
}

//Задание 5
const getLastDayOfMonth = (year, month) => {
    let newDate = new Date(year, month + 1, 0);
    return newDate.getDate();

}

const task5 = () =>{
    alert( getLastDayOfMonth(2012, 0) ); // 31
    alert( getLastDayOfMonth(2012, 1) ); // 29
    alert( getLastDayOfMonth(2013, 1) ); // 28
}

//Задание 6
const getSecondsToday = () => {
    let now = new Date();

    let today = new Date(now.getFullYear(), now.getMonth(), now.getDate())

    let diff = now - today
    return Math.round(diff / 1000)
        
}

const task6 = () =>{
    alert(getSecondsToday()) //36000 
}

//Задание 7
const formatDate = (date) => {
    const diff = (((new Date).getTime() - date.getTime()) / 1000)
    if(diff < 1){
        return "прямо сейчас"
    }
    else if(diff > 1 && diff < 60){
        return `${diff} сек. назад`
    }
    else if(diff > 60 && diff < 60 * 60){
        return `${diff / 60} мин. назад`
    }
    else{
        return `${date.getDate()}.${date.getMonth()}.${date.getFullYear()%100} ${date.getHours()}:${date.getMinutes()}`
    }
    // const diff = dat date.getSeconds()
}

const task7 = () =>{
    alert( formatDate(new Date(new Date - 1)) ); // "прямо сейчас"

    alert( formatDate(new Date(new Date - 30 * 1000)) ); // "30 сек. назад"

    alert( formatDate(new Date(new Date - 5 * 60 * 1000)) ); // "5 мин. назад"

    // вчерашняя дата вроде 31.12.2016, 20:00
    alert( formatDate(new Date(new Date - 86400 * 1000)) );
}

//Задание 8
const task8 = () =>{

}






document.getElementById("run_task_1").addEventListener("click", task1)
document.getElementById("run_task_2").addEventListener("click", task2)
document.getElementById("run_task_3").addEventListener("click", task3)
document.getElementById("run_task_4").addEventListener("click", task4)
document.getElementById("run_task_5").addEventListener("click", task5)
document.getElementById("run_task_6").addEventListener("click", task6)
document.getElementById("run_task_7").addEventListener("click", task7)
document.getElementById("run_task_8").addEventListener("click", task8)






