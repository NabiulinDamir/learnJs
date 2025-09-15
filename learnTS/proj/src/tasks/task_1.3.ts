(function () {
    const name = "task_3";
    const description = "Обьекты";
    const table = document.getElementById("task_table");

    function run(): void {
        //Программа

        let men: { name: string; old?: number };

        men = {
            name: "Damir",
            old: 22,
        };
        show("Имя: " + men.name);

        show(
            "/////////////////////////////////////////////////////////////////////////////"
        );

        men = { name: "Alex" };
        show("Имя: " + men.name);
        show("Имя: " + men.old);

        show(
            "/////////////////////////////////////////////////////////////////////////////"
        );

        printObj(men);

        function printObj(people: { name: string; old?: number }): any {
            show(`Имя: ${people.name}`);

            show(`Возраст: ${people.old ? people.old : "нет данных"}`);
        }

        show(
            "/////////////////////////////////////////////////////////////////////////////"
        );

        show("old" in men);

        men.old = 34;

        show("old" in men);

        show(
            "/////////////////////////////////////////////////////////////////////////////"
        );

        printObj2(men);

        function printObj2({ name, old }: { name: string; old?: number }): any {
            show(`Имя: ${name}`);

            show(`Возраст: ${old ? old : "нет данных"}`);
        }

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
