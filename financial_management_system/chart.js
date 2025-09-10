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

