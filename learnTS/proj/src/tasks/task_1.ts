(function () {
    const name = "task_1";
    const description = "Стрелочные функции";
    const table = document.getElementById("task_table");

    function run(): void {
        //Программа

        const x: number = 5
        const y: number = 4

        const sum = (x: number,y: number) => x + y;



        show(sum)
        show('5 + 4 = ' + sum(x, y));

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
    row.querySelector("button").addEventListener("click", () => {clear(); run();});
    table.appendChild(row);
})();
