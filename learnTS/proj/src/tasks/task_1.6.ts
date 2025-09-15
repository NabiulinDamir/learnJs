(function () {
    const name = "task_6";
    const description = "Кортежи";
    const table = <HTMLElement>document.getElementById("task_table");

    function run(): void {
        //Программа

        let user: [string, number];
        user = ["gg", 20];
        show(user);

        show(
            "/////////////////////////////////////////////////////////////////////////////"
        );

        type attestation = [string, ...number[]];

        let grade1: attestation = ["math", 4, 4, 5, 4, 5, 5];
        let grade2: attestation = ["Physics", 4, 2, 3];
        show(grade1);
        show(grade2);

        show(
            "/////////////////////////////////////////////////////////////////////////////"
        );

        type grade = attestation[];

        const tom_grade: grade = [
            ["math", 4, 4, 5, 4, 5, 5],
            ["Physics", 4, 2, 3],
        ];

        show(tom_grade);

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
