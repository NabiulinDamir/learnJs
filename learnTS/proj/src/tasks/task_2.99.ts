(function () {
    const name = "task_18";
    const description = "Мисиксы";
    const table = <HTMLElement>document.getElementById("task_table");

    function run(): void {
        //Программа

        class Animal {
            feed(): void {
                show("Кормим животное");
            }
        }

        class Movable {
            speed: number = 0;
            move(): void {
                show("Скорасть: " + this.speed);
            }
        }

        class Horse {}

        interface Horse extends Animal, Movable {}

        function applyMixins(derivedCtor: any, baseCtors: any[]) {
            baseCtors.forEach((baseCtor) => {
                Object.getOwnPropertyNames(baseCtor.prototype).forEach(
                    (name) => {
                        derivedCtor.prototype[name] = baseCtor.prototype[name];
                    }
                );
            });
        }

        applyMixins(Horse, [Animal, Movable]);

        let pony: Horse = new Horse();
        pony.feed();
        pony.speed = 49;
        pony.move();

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
