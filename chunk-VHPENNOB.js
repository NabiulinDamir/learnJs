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
  ɵɵlistener,
  ɵɵresolveWindow,
  ɵɵtext
} from "./chunk-JALFZZ2B.js";

// src/app/components/Components_Chart/charts/ChartWithNegative/chartWithNegative.component.ts
function ChartWithNegative_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 2);
    \u0275\u0275text(1, " \u041D\u0435\u0442 \u0434\u0430\u043D\u043D\u044B\u0445 ");
    \u0275\u0275domElementEnd();
  }
}
var ChartWithNegative = class _ChartWithNegative {
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
  init() {
    const theme = this.theme.darkTheme() ? "dark" : "";
    const chartDom = document.getElementById("chart-negative-container");
    this._chart?.dispose();
    if (!chartDom?.clientHeight) {
      return;
    }
    this._chart = init(chartDom, theme);
    this._chart.off("click");
    this._chart.on("click", (params) => {
      this.clickToChart(params);
    });
  }
  setOption() {
    this._chart?.setOption(this._option);
  }
  updateOption() {
    const data = this.format(this.localStorage.filter(this.localStorage.allOperations()));
    const intervalLocaleRu = this.filter.intervalLocale();
    this._option = {
      backgroundColor: "transparent",
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow"
        }
      },
      title: {
        text: `\u041E\u0440\u0435\u0440\u0430\u0446\u0438\u0438 \u0437\u0430 ${intervalLocaleRu}`,
        position: "top"
      },
      grid: {
        top: 80,
        bottom: 30
      },
      yAxis: {
        type: "value",
        position: "top",
        splitLine: {
          lineStyle: {
            type: "dashed"
          }
        }
      },
      xAxis: {
        data: data.map((item) => item.name),
        type: "category",
        axisLine: { show: false },
        axisLabel: {},
        axisTick: { show: false },
        splitLine: { show: false }
      },
      series: [
        {
          markLine: {
            data: [
              {
                yAxis: 0,
                lineStyle: {
                  color: "#0d6efd",
                  width: 2
                },
                label: { show: false }
              }
            ]
          },
          name: "\u0418\u0442\u043E\u0433\u043E",
          type: "bar",
          stack: "Total",
          label: {
            show: true,
            formatter: "{c}"
          },
          itemStyle: {
            color: (params) => {
              if (params.value > 0) {
                return "#28a745";
              } else if (params.value < 0) {
                return "#dc3545";
              } else {
                return "#000000";
              }
            }
          },
          data
        }
      ]
    };
  }
  format(data) {
    const allOperations = data.sort((a, b) => a.date.getTime() - b.date.getTime());
    const resultMap = /* @__PURE__ */ new Map();
    let currentDate = new Date(this.filter.startInterval());
    let endDate = new Date(this.filter.endInterval());
    do {
      const key = this.formatDate(currentDate);
      resultMap.set(key, { name: key, value: 0, date: currentDate });
      if (this.filter.interval() === "day") {
        currentDate.setHours(currentDate.getHours() + 1);
      } else if (this.filter.interval() === "month") {
        currentDate.setDate(currentDate.getDate() + 1);
      } else if (this.filter.interval() === "year") {
        currentDate.setMonth(currentDate.getMonth() + 1);
      } else {
        currentDate.setDate(currentDate.getDate() + 1);
      }
    } while (currentDate <= endDate);
    for (const operation of allOperations) {
      const key = this.formatDate(operation.date);
      const mapElemet = resultMap.get(key);
      const incomeValue = operation.type === "income" ? operation.value : 0;
      const expensValue = operation.type === "expens" ? -operation.value : 0;
      if (!mapElemet) {
        resultMap.set(key, { name: key, value: incomeValue + expensValue, date: operation.date });
      } else {
        resultMap.set(key, {
          name: key,
          value: mapElemet.value + incomeValue + expensValue,
          date: operation.date
        });
      }
    }
    const res = Array.from(resultMap.values());
    return res;
  }
  /////////////////////////////////////////////////////////////////////////////////////////////
  clickToChart(params) {
    if (params.componentType === "series") {
      this.filter.downInterval();
      setTimeout(() => this.filter.setDate(params.data.date), 100);
    }
  }
  /////////////////////////////////////////////////////////////////////////////////////////////
  formatDate(date) {
    const pattern = () => {
      switch (this.filter.interval()) {
        case "day":
          return "H";
        case "month":
          return "dd";
        case "year":
          return "MMMM";
        default:
          return "dd.MM.yyyy";
      }
    };
    return this.datePipe.transform(date, pattern());
  }
  ngAfterViewInit() {
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
    return this.localStorage.filter(this.localStorage.allOperations()).length > 0;
  }
  static \u0275fac = function ChartWithNegative_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ChartWithNegative)(\u0275\u0275directiveInject(LocalStorage), \u0275\u0275directiveInject(DatePipe), \u0275\u0275directiveInject(Filter), \u0275\u0275directiveInject(Theme));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ChartWithNegative, selectors: [["my-chart-negative"]], hostBindings: function ChartWithNegative_HostBindings(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275listener("resize", function ChartWithNegative_resize_HostBindingHandler() {
        return ctx.onWindowResize();
      }, \u0275\u0275resolveWindow);
    }
  }, features: [\u0275\u0275ProvidersFeature([DatePipe])], decls: 3, vars: 3, consts: [[1, "position-relative", "w-100", "d-flex", "justify-content-around", "h-100"], ["id", "chart-negative-container", 2, "width", "70rem", "max-width", "100vw"], [1, "position-absolute", "top-0", "left-0", "w-100", "h-100", "z-3", "d-flex", "justify-content-center", "align-items-center"]], template: function ChartWithNegative_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275domElementStart(0, "div", 0);
      \u0275\u0275domElement(1, "div", 1);
      \u0275\u0275conditionalCreate(2, ChartWithNegative_Conditional_2_Template, 2, 0, "div", 2);
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
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ChartWithNegative, [{
    type: Component,
    args: [{ selector: "my-chart-negative", providers: [DatePipe], template: '<div class="position-relative w-100 d-flex justify-content-around h-100 ">\n  <div\n    id="chart-negative-container"\n    [class.opacity-50]="!hasData"\n    style="width: 70rem; max-width: 100vw;"\n  ></div>\n  @if(!hasData){\n  <div\n    class="position-absolute top-0 left-0 w-100 h-100 z-3 d-flex justify-content-center align-items-center"\n  >\n    \u041D\u0435\u0442 \u0434\u0430\u043D\u043D\u044B\u0445\n  </div>\n  }\n</div>' }]
  }], () => [{ type: LocalStorage }, { type: DatePipe }, { type: Filter }, { type: Theme }], { onWindowResize: [{
    type: HostListener,
    args: ["window:resize"]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ChartWithNegative, { className: "ChartWithNegative", filePath: "src/app/components/Components_Chart/charts/ChartWithNegative/chartWithNegative.component.ts", lineNumber: 14 });
})();
export {
  ChartWithNegative
};
//# sourceMappingURL=chunk-VHPENNOB.js.map
