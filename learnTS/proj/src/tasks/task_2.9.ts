(function () {
    const name = "task_17";
    const description = "Обобщения";
    const table = <HTMLElement>document.getElementById("task_table");

    function run(): void {
        //Программа

        function toString<T>(args: Array<T>): string {
            return args.join(", ");
        }

        show(toString([9, "go", 2, 3]));

        show(
            "/////////////////////////////////////////////////////////////////////////////"
        );

        function compareName<T extends { name: string }>(
            obj1: T,
            obj2: T
        ): boolean {
            return obj1.name === obj2.name;
        }

        show(compareName({ name: "Fill" }, { id: 5, name: "Fill" }));
        show(compareName({ name: "Fill" }, { name: "NoFill" }));

        //show(compareName({ name: "Fill" }, { id: 4, noName: "Fill" }));

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
