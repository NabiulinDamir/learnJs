(function () {
    const name = "task_4";
    const description = "Псевдонимы";
    const table = document.getElementById("task_table");

    function run(): void {
        //Программа

        type people = { name: string; age: number };

        function printPerson({ name, age }: people): void {
            show(`Имя: ${name}<br>Возраст: ${age}`);
        }

        let person: people = { name: "Tom", age: 34 };

        printPerson(person);

        show(
            "/////////////////////////////////////////////////////////////////////////////"
        );

        type men = people & { bench_press: number };

        function printMen({ name, age, bench_press }: men): void {
            show(`Имя: ${name}<br>Возраст: ${age}<br>Жим: ${bench_press}`);
        }

        let person2: men = { name: "Jerry", age: 23, bench_press: 75 };

        printPerson(person2);

        show(
            "/////////////////////////////////////////////////////////////////////////////"
        );

        printMen(person2);

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
