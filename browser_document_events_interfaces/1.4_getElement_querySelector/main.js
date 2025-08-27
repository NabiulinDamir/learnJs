

    const table = document.getElementById("age-table")
    const lables = table.getElementsByTagName('label')
    const td = table.rows[0].cells[0]
    const form = document.querySelector('form[name="search"]')
    const input = form.querySelector('input')
    let inputs = form.querySelectorAll('input') // найти все input
     // взять последний


    alert(`
        ${table}
        ${lables}
        ${td}
        ${form}
        ${input}
        ${inputs[inputs.length-1]}

    `)






// document.getElementById("run_task_1").addEventListener("click", task1)





