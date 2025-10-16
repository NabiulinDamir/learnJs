import {
  init
} from "./chunk-X3QUG7OE.js";
import {
  Component,
  DatePipe,
  Filter,
  HostListener,
  LocalStorage,
  Theme,
  effect,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵProvidersFeature,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵdomElement,
  ɵɵdomElementEnd,
  ɵɵdomElementStart,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵresolveWindow,
  ɵɵtext
} from "./chunk-JALFZZ2B.js";

// src/app/components/Components_Chart/charts/ChartMega/chartMega.component.ts
function ChartMega_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 2);
    \u0275\u0275text(1, " \u041D\u0435\u0442 \u0434\u0430\u043D\u043D\u044B\u0445 ");
    \u0275\u0275domElementEnd();
  }
}
var ChartMega = class _ChartMega {
  localStorage;
  datePipe;
  filter;
  theme;
  _chart = void 0;
  _option = void 0;
  constructor(localStorage, datePipe, filter, theme) {
    this.localStorage = localStorage;
    this.datePipe = datePipe;
    this.filter = filter;
    this.theme = theme;
    effect(() => {
      this.updateOption();
      this.setOption();
    });
    effect(() => {
      this.init();
      this.setOption();
    });
  }
  setOption() {
    this._chart?.setOption(this._option);
  }
  init() {
    const theme = this.theme.darkTheme() ? "dark" : "";
    const chartDom = document.getElementById("chart-container");
    this._chart?.dispose();
    if (chartDom?.clientHeight === 0)
      return;
    this._chart = init(chartDom, theme);
  }
  updateOption() {
    const incomeOperationsFormat = this.formatToMonth(this.localStorage.getOperationsByType("income"));
    const expensOperationsFormat = this.formatToMonth(this.localStorage.getOperationsByType("expens"));
    const incomeCategoriesFormat = this.formatToCategory(this.localStorage.getOperationsByType("income"));
    const expensCategoriesFormat = this.formatToCategory(this.localStorage.getOperationsByType("expens"));
    const sortedIncome = [...incomeOperationsFormat].sort((a, b) => a.value - b.value);
    const sortedExpens = [...expensOperationsFormat].sort((a, b) => a.value - b.value);
    const incomeValues = sortedIncome.map((a) => a.value);
    const expensValues = sortedExpens.map((a) => a.value);
    const maxCount = Math.max(...incomeValues, ...expensValues);
    const summIncome = incomeValues.reduce((sum, a) => sum + a, 0);
    const summExpens = expensValues.reduce((sum, a) => sum + a, 0);
    const incomeMonthsArr = sortedIncome.map((a) => a.name);
    const expensMonthsArr = sortedExpens.map((a) => a.name);
    const reverseIncomeValue = incomeValues.map((a) => maxCount - a);
    const reverseExpensValue = expensValues.map((a) => maxCount - a);
    const bestCategoryIncomeName = incomeCategoriesFormat[0]?.name || "...";
    const bestCategoryExpensName = expensCategoriesFormat[0]?.name || "...";
    this._option = {
      backgroundColor: "transparent",
      tooltip: {},
      title: [
        {
          text: "\u0414\u043E\u0445\u043E\u0434\u044B",
          subtext: "\u0421\u0443\u043C\u043C\u0430\u0440\u043D\u043E: " + summIncome,
          left: "25%",
          textAlign: "center"
        },
        {
          text: "\u041A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0438 \u0434\u043E\u0445\u043E\u0434\u043E\u0432",
          subtext: "\u0411\u043E\u043B\u044C\u0448\u0435 \u0432\u0441\u0435\u0433\u043E \u0434\u043E\u0445\u043E\u0434\u043E\u0432: " + bestCategoryIncomeName,
          left: "75%",
          textAlign: "center"
        },
        {
          text: "\u0420\u0430\u0441\u0445\u043E\u0434\u044B",
          subtext: "\u0421\u0443\u043C\u043C\u0430\u0440\u043D\u043E: " + summExpens,
          left: "25%",
          top: "50%",
          textAlign: "center"
        },
        {
          text: "\u041A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0438 \u0440\u0430\u0441\u0445\u043E\u0434\u043E\u0432",
          subtext: "\u0411\u043E\u043B\u044C\u0448\u0435 \u0432\u0441\u0435\u0433\u043E \u0442\u0440\u0430\u0442: " + bestCategoryExpensName,
          left: "75%",
          top: "50%",
          textAlign: "center"
        }
      ],
      grid: [
        {
          top: "8%",
          width: "50%",
          bottom: "50%",
          left: 10,
          containLabel: true
        },
        {
          top: "56%",
          width: "50%",
          bottom: 0,
          left: 10,
          containLabel: true
        }
      ],
      xAxis: [
        {
          type: "value",
          max: maxCount,
          splitLine: {
            show: false
          }
        },
        {
          type: "value",
          max: maxCount,
          gridIndex: 1,
          splitLine: {
            show: false
          }
        }
      ],
      yAxis: [
        {
          type: "category",
          data: incomeMonthsArr,
          axisLabel: {
            interval: 0,
            rotate: 30
          },
          splitLine: {
            show: false
          }
        },
        {
          gridIndex: 1,
          type: "category",
          data: expensMonthsArr,
          axisLabel: {
            interval: 0,
            rotate: 30
          },
          splitLine: {
            show: false
          }
        }
      ],
      series: [
        {
          type: "bar",
          stack: "chart",
          z: 3,
          label: {
            position: "right",
            show: true
          },
          data: incomeValues
        },
        {
          type: "bar",
          stack: "chart",
          silent: true,
          itemStyle: {
            color: this.theme.darkTheme() ? "#353232ee" : "#eeee"
          },
          data: reverseIncomeValue
        },
        {
          type: "bar",
          stack: "component",
          xAxisIndex: 1,
          yAxisIndex: 1,
          z: 3,
          label: {
            position: "right",
            show: true
          },
          data: expensValues
        },
        {
          type: "bar",
          stack: "component",
          silent: true,
          xAxisIndex: 1,
          yAxisIndex: 1,
          itemStyle: {
            color: this.theme.darkTheme() ? "#353232ee" : "#eeee"
          },
          data: reverseExpensValue
        },
        {
          type: "pie",
          radius: [0, "30%"],
          center: ["75%", "25%"],
          data: incomeCategoriesFormat
        },
        {
          type: "pie",
          radius: [0, "30%"],
          center: ["75%", "75%"],
          data: expensCategoriesFormat
        }
      ]
    };
  }
  formatToMonth(data) {
    const allOperations = data.sort((a, b) => a.date.getTime() - b.date.getTime());
    const resultMap = /* @__PURE__ */ new Map();
    let currentDate = new Date(this.filter.startYearInteval());
    let endDate = new Date(this.filter.endYearInteval());
    do {
      const key = this.datePipe.transform(isNaN(currentDate.getTime()) ? /* @__PURE__ */ new Date() : currentDate, "MMMM");
      resultMap.set(key, { name: key, value: 0 });
      currentDate.setMonth(currentDate.getMonth() + 1);
    } while (currentDate <= endDate);
    for (const operation of allOperations) {
      const key = this.datePipe.transform(operation.date, "MMMM");
      const mapElemet = resultMap.get(key);
      resultMap.set(key, {
        name: key,
        value: mapElemet.value + operation.value
      });
    }
    const res = Array.from(resultMap.values());
    return res;
  }
  formatToCategory(data) {
    const resultMap = /* @__PURE__ */ new Map();
    data.forEach((item) => {
      const category = item.category;
      if (!resultMap.has(category)) {
        resultMap.set(category, { name: category, value: 0 });
      }
      const currentValue = resultMap.get(category).value;
      resultMap.set(category, { name: category, value: currentValue + item.value });
    });
    const res = Array.from(resultMap.values());
    return res;
  }
  ngAfterViewInit() {
    this.init();
    this.setOption();
  }
  ngOnDestroy() {
    this._chart?.dispose();
  }
  onWindowResize() {
    if (this._chart) {
      this._chart.resize();
    }
  }
  get hasData() {
    return this.localStorage.allOperations().length > 0;
  }
  static \u0275fac = function ChartMega_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ChartMega)(\u0275\u0275directiveInject(LocalStorage), \u0275\u0275directiveInject(DatePipe), \u0275\u0275directiveInject(Filter), \u0275\u0275directiveInject(Theme));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ChartMega, selectors: [["my-chart-mega"]], hostBindings: function ChartMega_HostBindings(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275listener("resize", function ChartMega_resize_HostBindingHandler() {
        return ctx.onWindowResize();
      }, \u0275\u0275resolveWindow);
    }
  }, features: [\u0275\u0275ProvidersFeature([DatePipe])], decls: 3, vars: 3, consts: [[1, "position-relative", "d-flex", "justify-content-around", "h-25rem"], ["id", "chart-container", 1, "w-100", 2, "height", "800px", "max-width", "100vw"], [1, "position-absolute", "top-0", "left-0", "w-100", "h-100", "z-3", "d-flex", "justify-content-center", "align-items-center"]], template: function ChartMega_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275domElementStart(0, "div", 0);
      \u0275\u0275domElement(1, "div", 1);
      \u0275\u0275conditionalCreate(2, ChartMega_Conditional_2_Template, 2, 0, "div", 2);
      \u0275\u0275domElementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275classProp("opacity-50", !ctx.hasData);
      \u0275\u0275advance();
      \u0275\u0275conditional(!ctx.hasData ? 2 : -1);
    }
  }, encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ChartMega, [{
    type: Component,
    args: [{ selector: "my-chart-mega", providers: [DatePipe], template: '<div class="position-relative d-flex justify-content-around h-25rem">\n  <div\n    id="chart-container"\n    class="w-100"\n    [class.opacity-50]="!hasData"\n    style="height: 800px; max-width: 100vw;"\n  ></div>\n  @if(!hasData){\n  <div class="position-absolute top-0 left-0 w-100 h-100 z-3 d-flex justify-content-center align-items-center" >\n    \u041D\u0435\u0442 \u0434\u0430\u043D\u043D\u044B\u0445\n  </div>\n  }\n</div>' }]
  }], () => [{ type: LocalStorage }, { type: DatePipe }, { type: Filter }, { type: Theme }], { onWindowResize: [{
    type: HostListener,
    args: ["window:resize"]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ChartMega, { className: "ChartMega", filePath: "src/app/components/Components_Chart/charts/ChartMega/chartMega.component.ts", lineNumber: 14 });
})();

// src/app/pages/chartPage/chartPage.component.ts
var ChartsPage = class _ChartsPage {
  title = signal("fms-angular-app", ...ngDevMode ? [{ debugName: "title" }] : []);
  constructor() {
  }
  static \u0275fac = function ChartsPage_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ChartsPage)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ChartsPage, selectors: [["my-app-main-page"]], decls: 2, vars: 0, consts: [[1, "h-100", "w-100"]], template: function ChartsPage_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0);
      \u0275\u0275element(1, "my-chart-mega");
      \u0275\u0275elementEnd();
    }
  }, dependencies: [ChartMega], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ChartsPage, [{
    type: Component,
    args: [{ selector: "my-app-main-page", imports: [ChartMega], standalone: true, template: "<div class='h-100 w-100'>\n  <my-chart-mega/>\n</div>" }]
  }], () => [], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ChartsPage, { className: "ChartsPage", filePath: "src/app/pages/chartPage/chartPage.component.ts", lineNumber: 9 });
})();
export {
  ChartsPage
};
//# sourceMappingURL=chunk-XMTDF2GK.js.map
