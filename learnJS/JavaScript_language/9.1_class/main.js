

//Задание 1

class Clock{
  
    timer = null;
    template = null;

    constructor(newTemplate){
        this.template = newTemplate
    }

    render() {
      let date = new Date();
  
      let hours = date.getHours();
      if (hours < 10) hours = '0' + hours;
  
      let mins = date.getMinutes();
      if (mins < 10) mins = '0' + mins;
  
      let secs = date.getSeconds();
      if (secs < 10) secs = '0' + secs;
  
      let output = this.template
        .replace('h', hours)
        .replace('m', mins)
        .replace('s', secs);
  
      console.log(output);
    }
  
    stop() {
      clearInterval(timer);
    };
  
    start() {
      this.render();
      this.timer = setInterval(() => this.render(), 1000);
    };
  
}



const task1 = () =>{
    let clock = new Clock('h:m:s');
    clock.start();
}






document.getElementById("run_task_1").addEventListener("click", task1)






