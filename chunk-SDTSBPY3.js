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

// src/app/components/Components_Chart/charts/ChartTwoRounded/chartTwoRounded.component.ts
function ChartTwoRounded_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 3);
    \u0275\u0275text(1, " \u041D\u0435\u0442 \u0434\u0430\u043D\u043D\u044B\u0445 ");
    \u0275\u0275domElementEnd();
  }
}
var ChartTwoRounded = class _ChartTwoRounded {
  localStorage;
  datePipe;
  filter;
  theme;
  _incomeChart = void 0;
  _expensChart = void 0;
  _incomeOption = void 0;
  _expensOption = void 0;
  constructor(localStorage, datePipe, filter, theme) {
    this.localStorage = localStorage;
    this.datePipe = datePipe;
    this.filter = filter;
    this.theme = theme;
    effect(() => {
      this.updateIncomeOption();
      this.updateExpensOption();
      this.setOption();
    });
    effect(() => {
      this.init();
      this.setOption();
    });
  }
  setOption() {
    this._incomeChart?.setOption(this._incomeOption);
    this._expensChart?.setOption(this._expensOption);
  }
  init() {
    const theme = this.theme.darkTheme() ? "dark" : "";
    const chartDomIncome = document.getElementById("my-chart-rounded-income");
    const chartDomExpens = document.getElementById("my-chart-rounded-expens");
    if (!chartDomIncome?.clientHeight || !chartDomExpens?.clientHeight) {
      return;
    }
    this._incomeChart?.dispose();
    this._expensChart?.dispose();
    this._incomeChart = init(chartDomIncome, theme);
    this._expensChart = init(chartDomExpens, theme);
  }
  updateIncomeOption() {
    const incomeData = this.localStorage.filter(this.localStorage.getOperationsByType("income"));
    this._incomeOption = this.getOption(incomeData, "\u0414\u043E\u0445\u043E\u0434\u044B");
  }
  updateExpensOption() {
    const expensData = this.localStorage.filter(this.localStorage.getOperationsByType("expens"));
    this._expensOption = this.getOption(expensData, "\u0414\u043E\u0445\u043E\u0434\u044B");
  }
  getOption(data, title) {
    const formatData = this.format(data);
    return {
      backgroundColor: "transparent",
      tooltip: {
        trigger: "item"
      },
      title: {
        text: `${title}: ${data.reduce((sum, item) => sum += item.value, 0)} \u0440\u0443\u0431.`,
        position: "top"
      },
      series: [
        {
          name: "\u041A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044F",
          type: "pie",
          radius: ["40%", "70%"],
          data: formatData,
          top: "10%",
          label: {
            show: true,
            position: "outside"
          },
          color: [
            "#0d6efd",
            // основной
            "#0a58ca",
            // темнее
            "#3d8bfd",
            // светлее
            "#6ea8fe",
            // еще светлее
            "#9fcdff",
            // самый светлый
            "#084298",
            // очень темный
            "#052c65"
            // максимально темный
          ]
        }
      ]
    };
  }
  format(data) {
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
  formatDate(date) {
    const pattern = () => {
      switch (this.filter.interval()) {
        case "day":
          return "H";
        case "month":
          return "d";
        case "year":
          return "MMMM";
        default:
          return "dd.MM.yyyy";
      }
    };
    return this.datePipe.transform(date, pattern());
  }
  ngAfterViewInit() {
    this.init();
    this.setOption();
  }
  ngOnDestroy() {
    this._incomeChart?.dispose();
    this._expensChart?.dispose();
  }
  onWindowResize() {
    if (this._incomeChart) {
      this._incomeChart.resize();
    }
    if (this._expensChart) {
      this._expensChart.resize();
    }
  }
  get hasData() {
    return this.localStorage.filter(this.localStorage.allOperations()).length > 0;
  }
  static \u0275fac = function ChartTwoRounded_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ChartTwoRounded)(\u0275\u0275directiveInject(LocalStorage), \u0275\u0275directiveInject(DatePipe), \u0275\u0275directiveInject(Filter), \u0275\u0275directiveInject(Theme));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ChartTwoRounded, selectors: [["my-chart-two-rounded"]], hostBindings: function ChartTwoRounded_HostBindings(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275listener("resize", function ChartTwoRounded_resize_HostBindingHandler() {
        return ctx.onWindowResize();
      }, \u0275\u0275resolveWindow);
    }
  }, features: [\u0275\u0275ProvidersFeature([DatePipe])], decls: 4, vars: 5, consts: [[1, "position-relative", "h-100", "w-100", "d-flex", "justify-content-around"], ["id", "my-chart-rounded-income", 2, "width", "30rem", "max-width", "40vw"], ["id", "my-chart-rounded-expens", 2, "width", "30rem", "max-width", "40vw"], [1, "position-absolute", "top-0", "left-0", "w-100", "h-100", "z-3", "d-flex", "justify-content-center", "align-items-center"]], template: function ChartTwoRounded_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275domElementStart(0, "div", 0);
      \u0275\u0275domElement(1, "div", 1)(2, "div", 2);
      \u0275\u0275conditionalCreate(3, ChartTwoRounded_Conditional_3_Template, 2, 0, "div", 3);
      \u0275\u0275domElementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275classProp("opacity-50", !ctx.hasData);
      \u0275\u0275advance();
      \u0275\u0275classProp("opacity-50", !ctx.hasData);
      \u0275\u0275advance();
      \u0275\u0275conditional(!ctx.hasData ? 3 : -1);
    }
  }, encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ChartTwoRounded, [{
    type: Component,
    args: [{ selector: "my-chart-two-rounded", providers: [DatePipe], template: '<div class="position-relative h-100 w-100 d-flex justify-content-around">\n  <div\n    id="my-chart-rounded-income"\n    [class.opacity-50]="!hasData"\n    style="width: 30rem; max-width: 40vw;"\n  ></div>\n  <div\n    id="my-chart-rounded-expens"\n    [class.opacity-50]="!hasData"\n    style="width: 30rem; max-width: 40vw;"\n  ></div>\n  @if(!hasData){\n  <div\n    class="position-absolute top-0 left-0 w-100 h-100 z-3 d-flex justify-content-center align-items-center"\n  >\n    \u041D\u0435\u0442 \u0434\u0430\u043D\u043D\u044B\u0445\n  </div>\n  }\n</div>' }]
  }], () => [{ type: LocalStorage }, { type: DatePipe }, { type: Filter }, { type: Theme }], { onWindowResize: [{
    type: HostListener,
    args: ["window:resize"]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ChartTwoRounded, { className: "ChartTwoRounded", filePath: "src/app/components/Components_Chart/charts/ChartTwoRounded/chartTwoRounded.component.ts", lineNumber: 19 });
})();
export {
  ChartTwoRounded
};
//# sourceMappingURL=chunk-SDTSBPY3.js.map
