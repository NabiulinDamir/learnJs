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
        show('5 + 4 = ' + sum(x, y));
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
    row.querySelector("button").addEventListener("click", function () { clear(); run(); });
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
    row.querySelector("button").addEventListener("click", function () { clear(); run(); });
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
    });
    table.appendChild(row);
})();
//# sourceMappingURL=main.js.map