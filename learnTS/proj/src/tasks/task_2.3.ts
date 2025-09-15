(function () {
    const name = "task_11";
    const description = "Абстрактные классы";
    const table = <HTMLElement>document.getElementById("task_table");

    function run(): void {
        //Программа

        abstract class Figure {
            abstract x: number;
            abstract y: number;
            abstract getArea(): void;
            abstract getPosition(): { x: number; y: number };
        }

        class Rectangle extends Figure {
            // x: number = 0;
            // y: number = 0;

            constructor(
                public width: number,
                public height: number,
                public x: number = 0,
                public y: number = 0
            ) {
                super();
            }

            getArea(): number {
                return this.width * this.height;
            }

            getPosition(): { x: number; y: number } {
                return { x: this.x, y: this.y };
            }
        }

        let figure1: Figure = new Rectangle(40, 20, 10, 15);
        show(figure1.getArea());
        show(
            `top: ${figure1.getPosition().x}<br>left: ${
                figure1.getPosition().y
            }`
        );

        show(
            "/////////////////////////////////////////////////////////////////////////////"
        );

        let figure2: Figure = new Rectangle(30, 10);
        show(figure2.getArea());

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
