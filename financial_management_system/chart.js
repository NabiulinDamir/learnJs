import localDB from './db.js'


const chart = echarts.init(document.getElementById('chart'));
export const updateRoundChart = async() => {
    let data = await localDB.getOperationsStatistic()

    const options = {
        legend: {},
        tooltip: {},
        dataset: {
            source: data
        },
        xAxis: { type: 'category' },
        yAxis: {},
        series: [
            {
                name: 'Доходы',
                type: 'bar'
            }, 
            {
                name: 'Расходы',
                type: 'bar'
            }
        ],
        dataZoom: [
            {
                type: 'slider',
                xAxisIndex: 0,
                start: 80,
                end: 100
            }
        ],
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },

    };

    chart.setOption(options);
}













// // Опции графика

// const options = {
//     legend: {},
//     tooltip: {},
//     dataset: {
//         dimensions: ['product', '2015', '2016', '2017'],
//         source: [
//             { product: 'Matcha', 2015: 43.3, 2016: 85.8 },
//             { product: 'Milk', 2015: 83.1, 2016: 73.4 },
//             { product: 'Chees', 2015: 86.4, 2016: 65.2 },
//             { product: 'Walnu', 2015: 72.4, 2016: 53.9 }
//         ]
//     },
//     xAxis: { type: 'category' },
//     yAxis: {},
//     series: [
//         {
//             name: 'Доходы',
//             type: 'bar'
//         }, 
//         {
//             name: 'Расходы',
//             type: 'bar'
//         }
//     ],
//     dataZoom: [
//         {
//             type: 'slider',
//             xAxisIndex: 0,
//             start: 30,
//             end: 70
//         }
//     ],
    
// };

// Установить опции и отобразить


// export const update = () => {
//     chart.setOption(options);
// }










