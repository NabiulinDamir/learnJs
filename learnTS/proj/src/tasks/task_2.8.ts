(function () {
    const name = "task_16";
    const description = "Преобразование типов";
    const table = <HTMLElement>document.getElementById("task_table");

    function run(): void {
        //Программа

        interface IPerson {
            name: string;
        }
        class Person {
            name: string;
            constructor(userName: string) {
                this.name = userName;
            }
        }

        class Employee extends Person {
            company: string;
            constructor(userName: string, company: string) {
                super(userName);
                this.company = company;
            }
        }
        function printPerson(user: IPerson): void {
            show(`IPerson ${user.name}`);
        }

        let tom: Person = new Employee("Tom", "Microsoft");
        printPerson(tom);

        printPerson({ name: "Sam" });

        printPerson({ name: "Sam", company: "simple" } as IPerson);

        show(
            "/////////////////////////////////////////////////////////////////////////////"
        );

        show(tom instanceof Person);

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
