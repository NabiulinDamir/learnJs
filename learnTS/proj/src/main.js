var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
(function () {
    var name = "task_0";
    var description = "Test_0";
    var table = document.getElementById("task_table");
    function run() {
        show("test");
        var f = 4;
    }
    function show(result) {
        if (result === void 0) { result = ""; }
        document.getElementById("lb_".concat(name)).innerHTML = result;
    }
    function clear() {
        document.getElementById("lb_".concat(name)).innerHTML = "";
    }
    var row = document.createElement("tr");
    row.innerHTML = "<tr>\n        <td>".concat(description, "</td>\n        <td id='lb_").concat(name, "'></td>\n        <td><button id='btn_").concat(name, "'>Run</button></td>\n    </tr>");
    row.querySelector("button").addEventListener("click", function () {
        clear();
        run();
        console.log("\u041F\u0440\u043E\u0433\u0440\u0430\u043C\u043C\u0430 ".concat(name, " \u0437\u0432\u0435\u0440\u0448\u0435\u043D\u0430."));
    });
    table.appendChild(row);
})();
(function () {
    var name = "task_1";
    var description = "Стрелочные функции";
    var table = document.getElementById("task_table");
    function run() {
        var x = 5;
        var y = 4;
        var sum = function (x, y) { return x + y; };
        show(sum);
        show("5 + 4 = " + sum(x, y));
    }
    function show(result) {
        if (result === void 0) { result = ""; }
        document.getElementById("lb_".concat(name)).innerHTML += result + "<br>";
    }
    function clear() {
        document.getElementById("lb_".concat(name)).innerHTML = "";
    }
    var row = document.createElement("tr");
    row.innerHTML = "<tr>\n        <td>".concat(description, "</td>\n        <td id='lb_").concat(name, "'></td>\n        <td><button id='btn_").concat(name, "'>Run</button></td>\n    </tr>");
    row.querySelector("button").addEventListener("click", function () {
        clear();
        run();
        console.log("\u041F\u0440\u043E\u0433\u0440\u0430\u043C\u043C\u0430 ".concat(name, " \u0437\u0432\u0435\u0440\u0448\u0435\u043D\u0430."));
    });
    table.appendChild(row);
})();
(function () {
    var name = "task_2";
    var description = "union";
    var table = document.getElementById("task_table");
    function run() {
        var id;
        id = "35ts1";
        show(id);
        id = 23;
        show(id);
        id = true;
        show(id);
    }
    function show(result) {
        if (result === void 0) { result = ""; }
        document.getElementById("lb_".concat(name)).innerHTML += result + "<br>";
    }
    function clear() {
        document.getElementById("lb_".concat(name)).innerHTML = "";
    }
    var row = document.createElement("tr");
    row.innerHTML = "<tr>\n        <td>".concat(description, "</td>\n        <td id='lb_").concat(name, "'></td>\n        <td><button id='btn_").concat(name, "'>Run</button></td>\n    </tr>");
    row.querySelector("button").addEventListener("click", function () {
        clear();
        run();
        console.log("\u041F\u0440\u043E\u0433\u0440\u0430\u043C\u043C\u0430 ".concat(name, " \u0437\u0432\u0435\u0440\u0448\u0435\u043D\u0430."));
    });
    table.appendChild(row);
})();
(function () {
    var name = "task_3";
    var description = "Обьекты";
    var table = document.getElementById("task_table");
    function run() {
        var men;
        men = {
            name: "Damir",
            old: 22,
        };
        show("Имя: " + men.name);
        show("/////////////////////////////////////////////////////////////////////////////");
        men = { name: "Alex" };
        show("Имя: " + men.name);
        show("Имя: " + men.old);
        show("/////////////////////////////////////////////////////////////////////////////");
        printObj(men);
        function printObj(people) {
            show("\u0418\u043C\u044F: ".concat(people.name));
            show("\u0412\u043E\u0437\u0440\u0430\u0441\u0442: ".concat(people.old ? people.old : "нет данных"));
        }
        show("/////////////////////////////////////////////////////////////////////////////");
        show("old" in men);
        men.old = 34;
        show("old" in men);
        show("/////////////////////////////////////////////////////////////////////////////");
        printObj2(men);
        function printObj2(_a) {
            var name = _a.name, old = _a.old;
            show("\u0418\u043C\u044F: ".concat(name));
            show("\u0412\u043E\u0437\u0440\u0430\u0441\u0442: ".concat(old ? old : "нет данных"));
        }
    }
    function show(result) {
        if (result === void 0) { result = ""; }
        document.getElementById("lb_".concat(name)).innerHTML += result + "<br>";
    }
    function clear() {
        document.getElementById("lb_".concat(name)).innerHTML = "";
    }
    var row = document.createElement("tr");
    row.innerHTML = "<tr>\n        <td>".concat(description, "</td>\n        <td id='lb_").concat(name, "'></td>\n        <td><button id='btn_").concat(name, "'>Run</button></td>\n    </tr>");
    row.querySelector("button").addEventListener("click", function () {
        clear();
        run();
        console.log("\u041F\u0440\u043E\u0433\u0440\u0430\u043C\u043C\u0430 ".concat(name, " \u0437\u0432\u0435\u0440\u0448\u0435\u043D\u0430."));
    });
    table.appendChild(row);
})();
(function () {
    var name = "task_4";
    var description = "Псевдонимы";
    var table = document.getElementById("task_table");
    function run() {
        function printPerson(_a) {
            var name = _a.name, age = _a.age;
            show("\u0418\u043C\u044F: ".concat(name, "<br>\u0412\u043E\u0437\u0440\u0430\u0441\u0442: ").concat(age));
        }
        var person = { name: "Tom", age: 34 };
        printPerson(person);
        show("/////////////////////////////////////////////////////////////////////////////");
        function printMen(_a) {
            var name = _a.name, age = _a.age, bench_press = _a.bench_press;
            show("\u0418\u043C\u044F: ".concat(name, "<br>\u0412\u043E\u0437\u0440\u0430\u0441\u0442: ").concat(age, "<br>\u0416\u0438\u043C: ").concat(bench_press));
        }
        var person2 = { name: "Jerry", age: 23, bench_press: 75 };
        printPerson(person2);
        show("/////////////////////////////////////////////////////////////////////////////");
        printMen(person2);
    }
    function show(result) {
        if (result === void 0) { result = ""; }
        document.getElementById("lb_".concat(name)).innerHTML += result + "<br>";
    }
    function clear() {
        document.getElementById("lb_".concat(name)).innerHTML = "";
    }
    var row = document.createElement("tr");
    row.innerHTML = "<tr>\n        <td>".concat(description, "</td>\n        <td id='lb_").concat(name, "'></td>\n        <td><button id='btn_").concat(name, "'>Run</button></td>\n    </tr>");
    row.querySelector("button").addEventListener("click", function () {
        clear();
        run();
        console.log("\u041F\u0440\u043E\u0433\u0440\u0430\u043C\u043C\u0430 ".concat(name, " \u0437\u0432\u0435\u0440\u0448\u0435\u043D\u0430."));
    });
    table.appendChild(row);
})();
(function () {
    var name = "task_5";
    var description = "Массивы";
    var table = document.getElementById("task_table");
    function run() {
        var peoples = ["Jack", "Daniel", "Umed"];
        var first = peoples[0], second = peoples[1], third = peoples[2];
        show(first);
        show(second);
        show(third);
        show("/////////////////////////////////////////////////////////////////////////////");
        var firstPeople = peoples[0], other = peoples.slice(1);
        show(firstPeople);
        show(other[0]);
        show(other[1]);
    }
    function show(result) {
        if (result === void 0) { result = ""; }
        document.getElementById("lb_".concat(name)).innerHTML += result + "<br>";
    }
    function clear() {
        document.getElementById("lb_".concat(name)).innerHTML = "";
    }
    var row = document.createElement("tr");
    row.innerHTML = "<tr>\n        <td>".concat(description, "</td>\n        <td id='lb_").concat(name, "'></td>\n        <td><button id='btn_").concat(name, "'>Run</button></td>\n    </tr>");
    row.querySelector("button").addEventListener("click", function () {
        clear();
        run();
        console.log("\u041F\u0440\u043E\u0433\u0440\u0430\u043C\u043C\u0430 ".concat(name, " \u0437\u0432\u0435\u0440\u0448\u0435\u043D\u0430."));
    });
    table.appendChild(row);
})();
(function () {
    var name = "task_6";
    var description = "Кортежи";
    var table = document.getElementById("task_table");
    function run() {
        var user;
        user = ["gg", 20];
        show(user);
        show("/////////////////////////////////////////////////////////////////////////////");
        var grade1 = ["math", 4, 4, 5, 4, 5, 5];
        var grade2 = ["Physics", 4, 2, 3];
        show(grade1);
        show(grade2);
        show("/////////////////////////////////////////////////////////////////////////////");
        var tom_grade = [
            ["math", 4, 4, 5, 4, 5, 5],
            ["Physics", 4, 2, 3],
        ];
        show(tom_grade);
    }
    function show(result) {
        if (result === void 0) { result = ""; }
        document.getElementById("lb_".concat(name)).innerHTML += result + "<br>";
    }
    function clear() {
        document.getElementById("lb_".concat(name)).innerHTML = "";
    }
    var row = document.createElement("tr");
    row.innerHTML = "<tr>\n        <td>".concat(description, "</td>\n        <td id='lb_").concat(name, "'></td>\n        <td><button id='btn_").concat(name, "'>Run</button></td>\n    </tr>");
    row.querySelector("button").addEventListener("click", function () {
        clear();
        run();
        console.log("\u041F\u0440\u043E\u0433\u0440\u0430\u043C\u043C\u0430 ".concat(name, " \u0437\u0432\u0435\u0440\u0448\u0435\u043D\u0430."));
    });
    table.appendChild(row);
})();
(function () {
    var name = "task_7";
    var description = "Неопределенный набор параметров";
    var table = document.getElementById("task_table");
    function run() {
        function sum() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var result = 0;
            for (var i = 0; i < args.length; i++) {
                result += args[i];
            }
            return result;
        }
        show(sum(3, 5, 2));
        show(sum());
        show("/////////////////////////////////////////////////////////////////////////////");
        function sum2(a, b, c) {
            var result = a + b;
            if (c) {
                result += c;
            }
            return result;
        }
        var arr = [3, 4];
        show(sum2.apply(void 0, arr));
        var arr2 = [3, 4, 4];
        show(sum2.apply(void 0, arr2));
    }
    function show(result) {
        if (result === void 0) { result = ""; }
        document.getElementById("lb_".concat(name)).innerHTML += result + "<br>";
    }
    function clear() {
        document.getElementById("lb_".concat(name)).innerHTML = "";
    }
    var row = document.createElement("tr");
    row.innerHTML = "<tr>\n        <td>".concat(description, "</td>\n        <td id='lb_").concat(name, "'></td>\n        <td><button id='btn_").concat(name, "'>Run</button></td>\n    </tr>");
    row.querySelector("button").addEventListener("click", function () {
        clear();
        run();
        console.log("\u041F\u0440\u043E\u0433\u0440\u0430\u043C\u043C\u0430 ".concat(name, " \u0437\u0432\u0435\u0440\u0448\u0435\u043D\u0430."));
    });
    table.appendChild(row);
})();
(function () {
    var name = "task_8";
    var description = "enum";
    var table = document.getElementById("task_table");
    function run() {
        var Season;
        (function (Season) {
            Season[Season["Winter"] = 0] = "Winter";
            Season[Season["Spring"] = 1] = "Spring";
            Season[Season["Summer"] = 2] = "Summer";
            Season[Season["Autumn"] = 3] = "Autumn";
        })(Season || (Season = {}));
        var current = Season.Winter;
        show(current);
        show("/////////////////////////////////////////////////////////////////////////////");
        var SeasonLocaleRU;
        (function (SeasonLocaleRU) {
            SeasonLocaleRU["Winter"] = "\u0417\u0438\u043C\u0430";
            SeasonLocaleRU["Spring"] = "\u0412\u0435\u0441\u043D\u0430";
            SeasonLocaleRU["Summer"] = "\u041B\u0435\u0442\u043E";
            SeasonLocaleRU["Autumn"] = "\u041E\u0441\u0435\u043D\u044C";
        })(SeasonLocaleRU || (SeasonLocaleRU = {}));
        show(SeasonLocaleRU.Summer);
        show("/////////////////////////////////////////////////////////////////////////////");
        var DayTime;
        (function (DayTime) {
            DayTime[DayTime["Morning"] = 0] = "Morning";
            DayTime[DayTime["Evening"] = 1] = "Evening";
        })(DayTime || (DayTime = {}));
        function welcome(dayTime) {
            if (dayTime === DayTime.Morning) {
                show("Доброе утро");
            }
            else {
                show("Добрый вечер");
            }
        }
        welcome(DayTime.Morning);
        welcome(DayTime.Evening);
    }
    function show(result) {
        if (result === void 0) { result = ""; }
        document.getElementById("lb_".concat(name)).innerHTML += result + "<br>";
    }
    function clear() {
        document.getElementById("lb_".concat(name)).innerHTML = "";
    }
    var row = document.createElement("tr");
    row.innerHTML = "<tr>\n        <td>".concat(description, "</td>\n        <td id='lb_").concat(name, "'></td>\n        <td><button id='btn_").concat(name, "'>Run</button></td>\n    </tr>");
    row.querySelector("button").addEventListener("click", function () {
        clear();
        run();
        console.log("\u041F\u0440\u043E\u0433\u0440\u0430\u043C\u043C\u0430 ".concat(name, " \u0437\u0432\u0435\u0440\u0448\u0435\u043D\u0430."));
    });
    table.appendChild(row);
})();
(function () {
    var name = "task_9";
    var description = "Классы";
    var table = document.getElementById("task_table");
    function run() {
        var User = (function () {
            function User(name, age) {
                this.name = name;
                this.age = age;
            }
            User.prototype.toString = function () {
                return "\u0418\u043C\u044F: ".concat(this.name, "; \u0412\u043E\u0437\u0440\u0430\u0441\u0442: ").concat(this.age);
            };
            return User;
        }());
        var men1 = new User("Damir", 22);
        show(men1.toString());
        var men2 = new User(men1.name, men1.age + 1);
        show(men2.toString());
    }
    function show(result) {
        if (result === void 0) { result = ""; }
        document.getElementById("lb_".concat(name)).innerHTML += result + "<br>";
    }
    function clear() {
        document.getElementById("lb_".concat(name)).innerHTML = "";
    }
    var row = document.createElement("tr");
    row.innerHTML = "<tr>\n        <td>".concat(description, "</td>\n        <td id='lb_").concat(name, "'></td>\n        <td><button id='btn_").concat(name, "'>Run</button></td>\n    </tr>");
    row.querySelector("button").addEventListener("click", function () {
        clear();
        run();
        console.log("\u041F\u0440\u043E\u0433\u0440\u0430\u043C\u043C\u0430 ".concat(name, " \u0437\u0432\u0435\u0440\u0448\u0435\u043D\u0430."));
    });
    table.appendChild(row);
})();
(function () {
    var name = "task_10";
    var description = "Наследование";
    var table = document.getElementById("task_table");
    function run() {
        var Person = (function () {
            function Person(name) {
                this.name = name;
            }
            Person.prototype.print = function () {
                show("\u0418\u043C\u044F: ".concat(this.name));
            };
            return Person;
        }());
        var Employee = (function (_super) {
            __extends(Employee, _super);
            function Employee(name, company) {
                var _this = _super.call(this, name) || this;
                _this.company = company;
                return _this;
            }
            Employee.prototype.print = function () {
                _super.prototype.print.call(this);
                show("\u041A\u043E\u043C\u043F\u0430\u043D\u0438\u044F: ".concat(this.company));
            };
            Employee.prototype.work = function () {
                show("".concat(this.name, " \u0440\u0430\u0431\u043E\u0442\u0430\u0435\u0442 \u0432 \u043A\u043E\u043C\u043F\u0430\u043D\u0438\u0438 ").concat(this.company, "."));
            };
            return Employee;
        }(Person));
        var men1 = new Employee("Damir", "Simpl");
        men1.print();
        men1.work();
    }
    function show(result) {
        if (result === void 0) { result = ""; }
        document.getElementById("lb_".concat(name)).innerHTML += result + "<br>";
    }
    function clear() {
        document.getElementById("lb_".concat(name)).innerHTML = "";
    }
    var row = document.createElement("tr");
    row.innerHTML = "<tr>\n        <td>".concat(description, "</td>\n        <td id='lb_").concat(name, "'></td>\n        <td><button id='btn_").concat(name, "'>Run</button></td>\n    </tr>");
    row.querySelector("button").addEventListener("click", function () {
        clear();
        run();
        console.log("\u041F\u0440\u043E\u0433\u0440\u0430\u043C\u043C\u0430 ".concat(name, " \u0437\u0432\u0435\u0440\u0448\u0435\u043D\u0430."));
    });
    table.appendChild(row);
})();
(function () {
    var name = "task_11";
    var description = "Абстрактные классы";
    var table = document.getElementById("task_table");
    function run() {
        var Figure = (function () {
            function Figure() {
            }
            return Figure;
        }());
        var Rectangle = (function (_super) {
            __extends(Rectangle, _super);
            function Rectangle(width, height, x, y) {
                if (x === void 0) { x = 0; }
                if (y === void 0) { y = 0; }
                var _this = _super.call(this) || this;
                _this.width = width;
                _this.height = height;
                _this.x = x;
                _this.y = y;
                return _this;
            }
            Rectangle.prototype.getArea = function () {
                return this.width * this.height;
            };
            Rectangle.prototype.getPosition = function () {
                return { x: this.x, y: this.y };
            };
            return Rectangle;
        }(Figure));
        var figure1 = new Rectangle(40, 20, 10, 15);
        show(figure1.getArea());
        show("top: ".concat(figure1.getPosition().x, "<br>left: ").concat(figure1.getPosition().y));
        show("/////////////////////////////////////////////////////////////////////////////");
        var figure2 = new Rectangle(30, 10);
        show(figure2.getArea());
    }
    function show(result) {
        if (result === void 0) { result = ""; }
        document.getElementById("lb_".concat(name)).innerHTML += result + "<br>";
    }
    function clear() {
        document.getElementById("lb_".concat(name)).innerHTML = "";
    }
    var row = document.createElement("tr");
    row.innerHTML = "<tr>\n        <td>".concat(description, "</td>\n        <td id='lb_").concat(name, "'></td>\n        <td><button id='btn_").concat(name, "'>Run</button></td>\n    </tr>");
    row.querySelector("button").addEventListener("click", function () {
        clear();
        run();
        console.log("\u041F\u0440\u043E\u0433\u0440\u0430\u043C\u043C\u0430 ".concat(name, " \u0437\u0432\u0435\u0440\u0448\u0435\u043D\u0430."));
    });
    table.appendChild(row);
})();
(function () {
    var name = "task_12";
    var description = "Модификаторы доступа";
    var table = document.getElementById("task_table");
    function run() {
        var Person = (function () {
            function Person(name, age) {
                this.name = name;
                this._birthYear = new Date().getFullYear() - age;
            }
            Person.prototype.print = function () {
                show("\u0418\u043C\u044F: ".concat(this.name, "; \u0413\u043E\u0434 \u0440\u0436\u0434\u0435\u043D\u0438\u044F: ").concat(this._birthYear));
            };
            return Person;
        }());
        var men1 = new Person("Дамир", 22);
        men1.print();
        show("/////////////////////////////////////////////////////////////////////////////");
        var Employee = (function (_super) {
            __extends(Employee, _super);
            function Employee(name, age, company) {
                var _this = _super.call(this, name, age) || this;
                _this.company = company;
                return _this;
            }
            Employee.prototype.print = function () {
                _super.prototype.print.call(this);
                show("\u041A\u043E\u043C\u043F\u0430\u043D\u0438\u044F: ".concat(this.company));
            };
            return Employee;
        }(Person));
        var men2 = new Employee("Alex", 23, "Greendata");
        men2.print();
    }
    function show(result) {
        if (result === void 0) { result = ""; }
        document.getElementById("lb_".concat(name)).innerHTML += result + "<br>";
    }
    function clear() {
        document.getElementById("lb_".concat(name)).innerHTML = "";
    }
    var row = document.createElement("tr");
    row.innerHTML = "<tr>\n        <td>".concat(description, "</td>\n        <td id='lb_").concat(name, "'></td>\n        <td><button id='btn_").concat(name, "'>Run</button></td>\n    </tr>");
    row.querySelector("button").addEventListener("click", function () {
        clear();
        run();
        console.log("\u041F\u0440\u043E\u0433\u0440\u0430\u043C\u043C\u0430 ".concat(name, " \u0437\u0432\u0435\u0440\u0448\u0435\u043D\u0430."));
    });
    table.appendChild(row);
})();
(function () {
    var name = "task_13";
    var description = "get set";
    var table = document.getElementById("task_table");
    function run() {
        var Person = (function () {
            function Person(_name, _age) {
                this._name = _name;
                this._age = _age;
            }
            Object.defineProperty(Person.prototype, "age", {
                get: function () {
                    return this._age;
                },
                set: function (arg) {
                    if (arg < 0 || arg > 100) {
                        console.log("Недопустимое значение");
                    }
                    else {
                        this._age = arg;
                    }
                },
                enumerable: false,
                configurable: true
            });
            Person.prototype.print = function () {
                show("\u0418\u043C\u044F: ".concat(this._name, "; \u0412\u043E\u0437\u0440\u0430\u0441\u0442: ").concat(this._age));
            };
            return Person;
        }());
        var men1 = new Person("Tomas", 23);
        men1.print();
        men1.age = 50;
        men1.print();
        men1.age = 150;
        men1.print();
    }
    function show(result) {
        if (result === void 0) { result = ""; }
        document.getElementById("lb_".concat(name)).innerHTML += result + "<br>";
    }
    function clear() {
        document.getElementById("lb_".concat(name)).innerHTML = "";
    }
    var row = document.createElement("tr");
    row.innerHTML = "<tr>\n        <td>".concat(description, "</td>\n        <td id='lb_").concat(name, "'></td>\n        <td><button id='btn_").concat(name, "'>Run</button></td>\n    </tr>");
    row.querySelector("button").addEventListener("click", function () {
        clear();
        run();
        console.log("\u041F\u0440\u043E\u0433\u0440\u0430\u043C\u043C\u0430 ".concat(name, " \u0437\u0432\u0435\u0440\u0448\u0435\u043D\u0430."));
    });
    table.appendChild(row);
})();
(function () {
    var name = "task_14";
    var description = "static";
    var table = document.getElementById("task_table");
    function run() {
        var Person = (function () {
            function Person(_name, _age) {
                this._name = _name;
                this._age = _age;
            }
            Object.defineProperty(Person.prototype, "age", {
                get: function () {
                    return this._age;
                },
                set: function (arg) {
                    if (arg < 0 || arg > 100) {
                        console.log("Недопустимое значение");
                    }
                    else {
                        this._age = arg;
                    }
                },
                enumerable: false,
                configurable: true
            });
            Person.calculateYears = function (age) {
                return Person.retirementAge - age;
            };
            Person.prototype.print = function () {
                show("\u0418\u043C\u044F: ".concat(this._name, "; \u0412\u043E\u0437\u0440\u0430\u0441\u0442: ").concat(this._age));
            };
            Person.retirementAge = 65;
            return Person;
        }());
        var men1 = new Person("Tomas", 23);
        men1.print();
        show("\u0414\u043E \u043F\u0435\u043D\u0441\u0438\u0438 \u043E\u0441\u0442\u0430\u043B\u043E\u0441\u044C: ".concat(Person.calculateYears(men1.age), " \u043B\u0435\u0442"));
    }
    function show(result) {
        if (result === void 0) { result = ""; }
        document.getElementById("lb_".concat(name)).innerHTML += result + "<br>";
    }
    function clear() {
        document.getElementById("lb_".concat(name)).innerHTML = "";
    }
    var row = document.createElement("tr");
    row.innerHTML = "<tr>\n        <td>".concat(description, "</td>\n        <td id='lb_").concat(name, "'></td>\n        <td><button id='btn_").concat(name, "'>Run</button></td>\n    </tr>");
    row.querySelector("button").addEventListener("click", function () {
        clear();
        run();
        console.log("\u041F\u0440\u043E\u0433\u0440\u0430\u043C\u043C\u0430 ".concat(name, " \u0437\u0432\u0435\u0440\u0448\u0435\u043D\u0430."));
    });
    table.appendChild(row);
})();
(function () {
    var name = "task_15";
    var description = "interface";
    var table = document.getElementById("task_table");
    function run() {
        var person = {
            id: 1,
            name: "Tom",
            age: 23,
            toString: function () {
                return "Id: ".concat(this.id, "; name: ").concat(this.name, "; age: ").concat(this.age);
            },
        };
        show(person.toString());
        show("/////////////////////////////////////////////////////////////////////////////");
        var User = (function () {
            function User(id, name, age, surname) {
                this.id = id;
                this.name = name;
                this.age = age;
                this.surname = surname;
            }
            User.prototype.print = function () {
                show("id: ".concat(this.id, "; name: ").concat(this.name, " ").concat(this.surname, "; age: ").concat(this.age));
            };
            return User;
        }());
        var newUser = new User(2, "Tom", 24, "Shelby");
        newUser.print();
        show("/////////////////////////////////////////////////////////////////////////////");
        var Car = (function () {
            function Car(speed, fuel) {
                this.speed = speed;
                this.fuel = fuel;
            }
            Car.prototype.move = function () {
                show("\u0421\u043A\u043E\u0440\u043E\u0441\u0442\u044C: ".concat(this.speed));
            };
            return Car;
        }());
        var tiguan = new Car(240, 54);
        tiguan.move();
    }
    function show(result) {
        if (result === void 0) { result = ""; }
        document.getElementById("lb_".concat(name)).innerHTML += result + "<br>";
    }
    function clear() {
        document.getElementById("lb_".concat(name)).innerHTML = "";
    }
    var row = document.createElement("tr");
    row.innerHTML = "<tr>\n        <td>".concat(description, "</td>\n        <td id='lb_").concat(name, "'></td>\n        <td><button id='btn_").concat(name, "'>Run</button></td>\n    </tr>");
    row.querySelector("button").addEventListener("click", function () {
        clear();
        run();
        console.log("\u041F\u0440\u043E\u0433\u0440\u0430\u043C\u043C\u0430 ".concat(name, " \u0437\u0432\u0435\u0440\u0448\u0435\u043D\u0430."));
    });
    table.appendChild(row);
})();
(function () {
    var name = "task_16";
    var description = "Преобразование типов";
    var table = document.getElementById("task_table");
    function run() {
        var Person = (function () {
            function Person(userName) {
                this.name = userName;
            }
            return Person;
        }());
        var Employee = (function (_super) {
            __extends(Employee, _super);
            function Employee(userName, company) {
                var _this = _super.call(this, userName) || this;
                _this.company = company;
                return _this;
            }
            return Employee;
        }(Person));
        function printPerson(user) {
            show("IPerson ".concat(user.name));
        }
        var tom = new Employee("Tom", "Microsoft");
        printPerson(tom);
        printPerson({ name: "Sam" });
        printPerson({ name: "Sam", company: "simple" });
        show("/////////////////////////////////////////////////////////////////////////////");
        show(tom instanceof Person);
    }
    function show(result) {
        if (result === void 0) { result = ""; }
        document.getElementById("lb_".concat(name)).innerHTML += result + "<br>";
    }
    function clear() {
        document.getElementById("lb_".concat(name)).innerHTML = "";
    }
    var row = document.createElement("tr");
    row.innerHTML = "<tr>\n        <td>".concat(description, "</td>\n        <td id='lb_").concat(name, "'></td>\n        <td><button id='btn_").concat(name, "'>Run</button></td>\n    </tr>");
    row.querySelector("button").addEventListener("click", function () {
        clear();
        run();
        console.log("\u041F\u0440\u043E\u0433\u0440\u0430\u043C\u043C\u0430 ".concat(name, " \u0437\u0432\u0435\u0440\u0448\u0435\u043D\u0430."));
    });
    table.appendChild(row);
})();
(function () {
    var name = "task_17";
    var description = "Обобщения";
    var table = document.getElementById("task_table");
    function run() {
        function toString(args) {
            return args.join(", ");
        }
        show(toString([9, "go", 2, 3]));
        show("/////////////////////////////////////////////////////////////////////////////");
        function compareName(obj1, obj2) {
            return obj1.name === obj2.name;
        }
        show(compareName({ name: "Fill" }, { id: 5, name: "Fill" }));
        show(compareName({ name: "Fill" }, { name: "NoFill" }));
    }
    function show(result) {
        if (result === void 0) { result = ""; }
        document.getElementById("lb_".concat(name)).innerHTML += result + "<br>";
    }
    function clear() {
        document.getElementById("lb_".concat(name)).innerHTML = "";
    }
    var row = document.createElement("tr");
    row.innerHTML = "<tr>\n        <td>".concat(description, "</td>\n        <td id='lb_").concat(name, "'></td>\n        <td><button id='btn_").concat(name, "'>Run</button></td>\n    </tr>");
    row.querySelector("button").addEventListener("click", function () {
        clear();
        run();
        console.log("\u041F\u0440\u043E\u0433\u0440\u0430\u043C\u043C\u0430 ".concat(name, " \u0437\u0432\u0435\u0440\u0448\u0435\u043D\u0430."));
    });
    table.appendChild(row);
})();
(function () {
    var name = "task_18";
    var description = "Мисиксы";
    var table = document.getElementById("task_table");
    function run() {
        var Animal = (function () {
            function Animal() {
            }
            Animal.prototype.feed = function () {
                show("Кормим животное");
            };
            return Animal;
        }());
        var Movable = (function () {
            function Movable() {
                this.speed = 0;
            }
            Movable.prototype.move = function () {
                show("Скорасть: " + this.speed);
            };
            return Movable;
        }());
        var Horse = (function () {
            function Horse() {
            }
            return Horse;
        }());
        function applyMixins(derivedCtor, baseCtors) {
            baseCtors.forEach(function (baseCtor) {
                Object.getOwnPropertyNames(baseCtor.prototype).forEach(function (name) {
                    derivedCtor.prototype[name] = baseCtor.prototype[name];
                });
            });
        }
        applyMixins(Horse, [Animal, Movable]);
        var pony = new Horse();
        pony.feed();
        pony.speed = 49;
        pony.move();
    }
    function show(result) {
        if (result === void 0) { result = ""; }
        document.getElementById("lb_".concat(name)).innerHTML += result + "<br>";
    }
    function clear() {
        document.getElementById("lb_".concat(name)).innerHTML = "";
    }
    var row = document.createElement("tr");
    row.innerHTML = "<tr>\n        <td>".concat(description, "</td>\n        <td id='lb_").concat(name, "'></td>\n        <td><button id='btn_").concat(name, "'>Run</button></td>\n    </tr>");
    row.querySelector("button").addEventListener("click", function () {
        clear();
        run();
        console.log("\u041F\u0440\u043E\u0433\u0440\u0430\u043C\u043C\u0430 ".concat(name, " \u0437\u0432\u0435\u0440\u0448\u0435\u043D\u0430."));
    });
    table.appendChild(row);
})();
//# sourceMappingURL=main.js.map