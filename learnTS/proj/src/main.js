var taskName = "Task_1";
function run() {
}
var table = this.document.getElementById("task_table");
table.innerHTML += "<tr>\n                        <td>".concat(taskName, "</td>\n                        <td>sdfs</td>\n                        <td><button id='btn_").concat(taskName, "'>Run</button></td>\n                    </tr>");
this.document.getElementById("btn_".concat(taskName)).addEventListener("click", run);
//# sourceMappingURL=main.js.map