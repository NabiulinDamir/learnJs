const taskName: String = "Task_1";

function run(): void {

}




const table = this.document.getElementById("task_table");
table.innerHTML += `<tr>
                        <td>${taskName}</td>
                        <td>sdfs</td>
                        <td><button id='btn_${taskName}'>Run</button></td>
                    </tr>`;
this.document.getElementById(`btn_${taskName}`).addEventListener("click", run);
