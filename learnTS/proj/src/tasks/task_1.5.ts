(function () {
    const name = "task_5";
    const description = "Массивы";
    const table = <HTMLElement>document.getElementById("task_table");

    function run(): void {
        //Программа

        const peoples: readonly string[] = ["Jack", "Daniel", "Umed"];

        const [first, second, third] = peoples;

        show(first);
        show(second);
        show(third);

        show(
            "/////////////////////////////////////////////////////////////////////////////"
        );

        const [firstPeople, ...other] = peoples;

        show(firstPeople);
        show(other[0]);
        show(other[1]);

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
