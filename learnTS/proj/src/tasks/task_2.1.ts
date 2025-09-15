(function () {
    const name = "task_9";
    const description = "Классы";
    const table = <HTMLElement>document.getElementById("task_table");

    function run(): void {
        //Программа

        class User {
            name: string;
            age: number;

            constructor(name: string, age: number) {
                this.name = name;
                this.age = age;
            }

            toString(): string {
                return `Имя: ${this.name}; Возраст: ${this.age}`;
            }
        }

        const men1: User = new User("Damir", 22);

        show(men1.toString());

        const men2: User = new User(men1.name, men1.age + 1);

        show(men2.toString());

        /////////////////////////
    }

    function show(result: any = ""): void {
        document.getElementById(`lb_${name}`).innerHTML += result + "<br>";
    }

    function clear(): void {
        document.getElementById(`lb_${name}`).innerHTML = "";
    }

    const row = document.createElement("tr");
    row.innerHTML = `<tr>
        <td>${description}</td>
        <td id='lb_${name}'></td>
        <td><button id='btn_${name}'>Run</button></td>
    </tr>`;
    row.querySelector("button").addEventListener("click", () => {
        clear();
        run();
        console.log(`Программа ${name} звершена.`);
    });
    table.appendChild(row);
})();
