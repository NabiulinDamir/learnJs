(function () {
    const name = "task_2";
    const description = "union";
    const table = document.getElementById("task_table");

    function run(): void {
        //Программа
        let id: number | string | boolean

        id = "35ts1"
        show(id)

        id = 23
        show(id)

        id = true
        show(id)

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
