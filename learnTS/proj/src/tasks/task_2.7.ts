(function () {
    const name = "task_15";
    const description = "interface";
    const table = <HTMLElement>document.getElementById("task_table");

    function run(): void {
        //Программа

        interface IUser {
            id: number;
            name: string;
            age?: number;
            toString(): string;
        }

        interface IUser {
            surname?: string;
        }

        const person: IUser = {
            id: 1,
            name: "Tom",
            age: 23,
            toString: function (): string {
                return `Id: ${this.id}; name: ${this.name}; age: ${this.age}`;
            },
        };

        show(person.toString());

        show(
            "/////////////////////////////////////////////////////////////////////////////"
        );

        class User implements IUser {
            constructor(
                public id: number,
                public name: string,
                public age: number,
                public surname: string
            ) {}

            print(): void {
                show(
                    `id: ${this.id}; name: ${this.name} ${this.surname}; age: ${this.age}`
                );
            }
        }

        let newUser: User = new User(2, "Tom", 24, "Shelby");
        newUser.print();

        show(
            "/////////////////////////////////////////////////////////////////////////////"
        );

        interface IMovable {
            speed: number;
            move(): void;
        }

        interface ICar extends IMovable {
            fuel: number;
        }

        class Car implements ICar {
            constructor(public speed: number, public fuel: number) {}

            move(): void {
                show(`Скорость: ${this.speed}`);
            }
        }

        const tiguan: Car = new Car(240, 54);

        tiguan.move();

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
