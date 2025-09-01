import localDB from './db.js'


setDataForTable()
async function setDataForTable(){
    let data = await localDB.getAll()
    main_table.querySelector('tbody').innerHTML = ""
    console.log(data)

    const addNul = (number) => number < 9 ? `0${number}` : number

    data.forEach(d => {
        main_table.querySelector('tbody').innerHTML += 
        `<tr>
            <th>0</th>
            <th>${d.categoryId}</th>
            <td>${d.value}</td>
            <td>${addNul(d.date.getDate())}.${addNul(d.date.getMonth())}.${addNul(d.date.getFullYear())}</td>
        </tr>`
    });
}

