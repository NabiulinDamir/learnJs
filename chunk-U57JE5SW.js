import {
  ChartOptions
} from "./chunk-KYCPQ5EH.js";
import {
  Chart
} from "./chunk-KRGFBBUI.js";
import {
  Component,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵProvidersFeature,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵproperty
} from "./chunk-2E3OQR6L.js";

// src/app/pages/chartPage/chartPage.component.ts
var ChartsPage = class _ChartsPage {
  chartOptions;
  title = signal("fms-angular-app", ...ngDevMode ? [{ debugName: "title" }] : []);
  constructor(chartOptions) {
    this.chartOptions = chartOptions;
  }
  static \u0275fac = function ChartsPage_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ChartsPage)(\u0275\u0275directiveInject(ChartOptions));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ChartsPage, selectors: [["my-app-main-page"]], features: [\u0275\u0275ProvidersFeature([ChartOptions])], decls: 2, vars: 1, consts: [[1, "h-100", "w-100vw"], ["name", "mega", 3, "option"]], template: function ChartsPage_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0);
      \u0275\u0275element(1, "my-chart", 1);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275property("option", ctx.chartOptions.MEGA());
    }
  }, dependencies: [Chart], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ChartsPage, [{
    type: Component,
    args: [{ selector: "my-app-main-page", imports: [Chart], standalone: true, providers: [ChartOptions], template: `<div class='h-100 w-100vw'>
  <my-chart name="mega" [option]="chartOptions.MEGA()"/>
</div>` }]
  }], () => [{ type: ChartOptions }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ChartsPage, { className: "ChartsPage", filePath: "src/app/pages/chartPage/chartPage.component.ts", lineNumber: 12 });
})();
export {
  ChartsPage
};
//# sourceMappingURL=chunk-U57JE5SW.js.map
