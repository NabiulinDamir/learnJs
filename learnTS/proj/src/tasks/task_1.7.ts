(function () {
    const name = "task_7";
    const description = "Неопределенный набор параметров";
    const table = <HTMLElement>document.getElementById("task_table");

    function run(): void {
        //Программа

        function sum(...args: number[]): number {
            let result: number = 0;
            for (let i = 0; i < args.length; i++) {
                result += args[i];
            }
            return result;
        }

        show(sum(3, 5, 2));
        show(sum());

        show(
            "/////////////////////////////////////////////////////////////////////////////"
        );

        function sum2(a: number, b: number, c?: number): number {
            let result: number = a + b;
            if (c) {
                result += c;
            }
            return result;
        }

        const arr = [3, 4] as const;
        show(sum2(...arr));

        const arr2 = [3, 4, 4] as const;
        show(sum2(...arr2));

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
