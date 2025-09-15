(function () {
    const name = "task_14";
    const description = "static";
    const table = <HTMLElement>document.getElementById("task_table");

    function run(): void {
        //Программа

        class Person {
            protected static retirementAge: number = 65;

            constructor(private _name: string, private _age: number) {}

            get age(): number {
                return this._age;
            }

            set age(arg: number) {
                if (arg < 0 || arg > 100) {
                    console.log("Недопустимое значение");
                } else {
                    this._age = arg;
                }
            }

            static calculateYears(age: number) {
                return Person.retirementAge - age;
            }

            print(): void {
                show(`Имя: ${this._name}; Возраст: ${this._age}`);
            }
        }

        const men1: Person = new Person("Tomas", 23);
        men1.print();

        show(`До пенсии осталось: ${Person.calculateYears(men1.age)} лет`);

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
