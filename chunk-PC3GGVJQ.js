import {
  Chart
} from "./chunk-XBVNOF5R.js";
import {
  Component,
  Filter,
  LocalStorage,
  Theme,
  computed,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵProvidersFeature,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵproperty
} from "./chunk-4AIEVVNH.js";

// src/app/components/Components_Chart/Mega/megaChart.component.ts
var MegaChart = class _MegaChart {
  localStorage;
  filterService;
  theme;
  constructor(localStorage, filterService, theme) {
    this.localStorage = localStorage;
    this.filterService = filterService;
    this.theme = theme;
  }
  option = computed(() => {
    const sortedIncome = [...this.incomeOperationsToMonth()].sort((a, b) => a.value - b.value);
    const sortedExpens = [...this.expensOperationsToMonth()].sort((a, b) => a.value - b.value);
    const incomeValues = sortedIncome.map((a) => a.value);
    const expensValues = sortedExpens.map((a) => a.value);
    const maxCount = Math.max(...incomeValues, ...expensValues);
    const summIncome = incomeValues.reduce((sum, a) => sum + a, 0);
    const summExpens = expensValues.reduce((sum, a) => sum + a, 0);
    const incomeMonthsArr = sortedIncome.map((a) => a.name);
    const expensMonthsArr = sortedExpens.map((a) => a.name);
    const reverseIncomeValue = incomeValues.map((a) => maxCount - a);
    const reverseExpensValue = expensValues.map((a) => maxCount - a);
    const bestCategoryIncomeName = this.incomeOperationsToCategory()[0]?.name || "...";
    const bestCategoryExpensName = this.expensOperationsToCategory()[0]?.name || "...";
    return {
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
          data: this.incomeOperationsToCategory()
        },
        {
          type: "pie",
          radius: [0, "30%"],
          center: ["75%", "75%"],
          data: this.expensOperationsToCategory()
        }
      ]
    };
  }, ...ngDevMode ? [{ debugName: "option" }] : []);
  incomeOperationsToMonth = computed(() => this.formatToMonth(this.localStorage.getAllOperationsByType("income")), ...ngDevMode ? [{ debugName: "incomeOperationsToMonth" }] : []);
  expensOperationsToMonth = computed(() => this.formatToMonth(this.localStorage.getAllOperationsByType("expens")), ...ngDevMode ? [{ debugName: "expensOperationsToMonth" }] : []);
  incomeOperationsToCategory = computed(() => this.formattToCategory(this.localStorage.getAllOperationsByType("income")), ...ngDevMode ? [{ debugName: "incomeOperationsToCategory" }] : []);
  expensOperationsToCategory = computed(() => this.formattToCategory(this.localStorage.getAllOperationsByType("expens")), ...ngDevMode ? [{ debugName: "expensOperationsToCategory" }] : []);
  formatToMonth(data) {
    const allOperations = data.sort((a, b) => a.date.getTime() - b.date.getTime());
    const resultMap = /* @__PURE__ */ new Map();
    let currentDate = new Date(this.filterService.startYearInteval());
    let endDate = new Date(this.filterService.endYearInteval());
    do {
      const key = this.formatDate(currentDate);
      resultMap.set(key, { name: key, value: 0 });
      currentDate.setMonth(currentDate.getMonth() + 1);
    } while (currentDate <= endDate);
    for (const operation of allOperations) {
      const key = this.formatDate(operation.date);
      const mapElemet = resultMap.get(key);
      resultMap.set(key, {
        name: key,
        value: mapElemet.value + operation.value
      });
    }
    const res = Array.from(resultMap.values());
    return res;
  }
  formattToCategory(data) {
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
    const MONTHS = ["\u042F\u043D\u0432\u0430\u0440\u044C", "\u0424\u0435\u0432\u0440\u0430\u043B\u044C", "\u041C\u0430\u0440\u0442", "\u0410\u043F\u0440\u0435\u043B\u044C", "\u041C\u0430\u0439", "\u0418\u044E\u043D\u044C", "\u0418\u044E\u043B\u044C", "\u0410\u0432\u0433\u0443\u0441\u0442", "\u0421\u0435\u043D\u0442\u044F\u0431\u0440\u044C", "\u041E\u043A\u0442\u044F\u0431\u0440\u044C", "\u041D\u043E\u044F\u0431\u0440\u044C", "\u0414\u0435\u043A\u0430\u0431\u0440\u044C"];
    return MONTHS[date.getMonth()];
  }
  static \u0275fac = function MegaChart_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MegaChart)(\u0275\u0275directiveInject(LocalStorage), \u0275\u0275directiveInject(Filter), \u0275\u0275directiveInject(Theme));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _MegaChart, selectors: [["my-mega-chart"]], decls: 1, vars: 1, consts: [["name", "mega", 3, "option"]], template: function MegaChart_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275element(0, "my-chart", 0);
    }
    if (rf & 2) {
      \u0275\u0275property("option", ctx.option());
    }
  }, dependencies: [Chart], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MegaChart, [{
    type: Component,
    args: [{ selector: "my-mega-chart", imports: [Chart], template: '<my-chart name="mega" [option]="option()" >' }]
  }], () => [{ type: LocalStorage }, { type: Filter }, { type: Theme }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(MegaChart, { className: "MegaChart", filePath: "src/app/components/Components_Chart/Mega/megaChart.component.ts", lineNumber: 12 });
})();

// src/app/pages/chartPage/chartPage.component.ts
var ChartsPage = class _ChartsPage {
  title = signal("fms-angular-app", ...ngDevMode ? [{ debugName: "title" }] : []);
  constructor() {
  }
  static \u0275fac = function ChartsPage_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ChartsPage)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ChartsPage, selectors: [["my-app-main-page"]], features: [\u0275\u0275ProvidersFeature([])], decls: 2, vars: 0, consts: [[2, "height", "800px"]], template: function ChartsPage_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0);
      \u0275\u0275element(1, "my-mega-chart");
      \u0275\u0275elementEnd();
    }
  }, dependencies: [MegaChart], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ChartsPage, [{
    type: Component,
    args: [{ selector: "my-app-main-page", imports: [MegaChart], standalone: true, providers: [], template: '<div style="height: 800px;">\n  <my-mega-chart />\n</div>' }]
  }], () => [], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ChartsPage, { className: "ChartsPage", filePath: "src/app/pages/chartPage/chartPage.component.ts", lineNumber: 11 });
})();
export {
  ChartsPage
};
//# sourceMappingURL=chunk-PC3GGVJQ.js.map
