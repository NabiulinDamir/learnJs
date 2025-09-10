import localDB from "./db.js";


const chart   = echarts.init(document.getElementById("chart_1"));
const chart21 = echarts.init(document.getElementById("chart_2_1"));
const chart22 = echarts.init(document.getElementById("chart_2_2"));
export const updateSalineChart = async () => {
  let data = await localDB.getDateFormat();

  const options = {
    legend: {},
    tooltip: {},
    dataset: {
      source: data,
    },
    xAxis: { type: "category" },
    yAxis: {},
    series: [
      {
        name: "Доходы",
        type: "bar",
        color: ['#5f83aaff',],
      },
      {
        name: "Расходы",
        type: "bar",
        color: ['#2c4157',],
      },
      
    ],
    dataZoom: [
      {
        type: "slider",
        xAxisIndex: 0,
        start: 0,
        end: 100,
      },
    ],
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
  };

  chart.setOption(options);
};

export const updateRoundChart = async () => {
  const income = await localDB.getIncomeCategoryFormat();
  const expens = await localDB.getExpensCategoryFormat();

  const option = {
    tooltip: {
      trigger: "item",
    },
    title: {
      text: `Доходы: ${income.reduce((sum, item) => sum += item.value, 0)} руб.`,
      position: 'top'
    },

    series: [
      {
        name: 'Категория',
        type: 'pie',
        radius: ['40%', '70%'],
        data: income,
        top: '10%',
        label: {
          show: true,
          position: 'outside'
          
        },
        color: [
          '#2c4157',
          '#3f5d7d',
          '#5279a3',
          '#5487ad',
          '#6da6e1',
          'rgba(223, 173, 203, 1)',
        ],


      }]
  };

  const option2 = structuredClone(option)
  option2.series[0].data = expens
  option2.title.text = `Расходы ${expens.reduce((sum, item) => sum += item.value, 0)} руб.`


  chart21.setOption(option);
  chart22.setOption(option2)
};

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
