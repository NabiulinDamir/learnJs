(function () {
    const name = "task_10";
    const description = "Наследование";
    const table = <HTMLElement>document.getElementById("task_table");

    function run(): void {
        //Программа

        class Person {
            name: string;

            constructor(name: string) {
                this.name = name;
            }

            print(): void {
                show(`Имя: ${this.name}`);
            }
        }

        class Employee extends Person {
            company: string;

            constructor(name: string, company: string) {
                super(name);
                this.company = company;
            }
            print(): void {
                super.print();
                show(`Компания: ${this.company}`);
            }

            work(): void {
                show(`${this.name} работает в компании ${this.company}.`);
            }
        }

        const men1: Employee = new Employee("Damir", "Simpl");

        men1.print();

        men1.work();

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
