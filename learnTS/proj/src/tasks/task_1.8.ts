(function () {
    const name = "task_8";
    const description = "enum";
    const table = <HTMLElement>document.getElementById("task_table");

    function run(): void {
        //Программа

        enum Season {
            Winter,
            Spring,
            Summer,
            Autumn,
        }
        const current: Season = Season.Winter;
        show(current);

        show(
            "/////////////////////////////////////////////////////////////////////////////"
        );

        enum SeasonLocaleRU {
            Winter = "Зима",
            Spring = "Весна",
            Summer = "Лето",
            Autumn = "Осень",
        }

        show(SeasonLocaleRU.Summer);

        show(
            "/////////////////////////////////////////////////////////////////////////////"
        );

        enum DayTime {
            Morning,
            Evening,
        }

        function welcome(dayTime: DayTime): void {
            if (dayTime === DayTime.Morning) {
                show("Доброе утро");
            } else {
                show("Добрый вечер");
            }
        }

        welcome(DayTime.Morning);
        welcome(DayTime.Evening);

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
