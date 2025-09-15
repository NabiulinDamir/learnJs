(function () {
    const name = "task_12";
    const description = "Модификаторы доступа";
    const table = <HTMLElement>document.getElementById("task_table");

    function run(): void {
        //Программа

        class Person {
            protected name: string;
            private _birthYear: number;

            constructor(name: string, age: number) {
                this.name = name;
                this._birthYear = new Date().getFullYear() - age;
            }

            public print() {
                show(`Имя: ${this.name}; Год рждения: ${this._birthYear}`);
            }
        }

        const men1: Person = new Person("Дамир", 22);
        men1.print();
        //console.log(men1._birthYear);

        show(
            "/////////////////////////////////////////////////////////////////////////////"
        );

        class Employee extends Person {
            constructor(name: string, age: number, protected company: string) {
                super(name, age);
            }

            public print(): void {
                super.print();
                show(`Компания: ${this.company}`);
            }
        }

        const men2: Person = new Employee("Alex", 23, "Greendata");
        men2.print();

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
