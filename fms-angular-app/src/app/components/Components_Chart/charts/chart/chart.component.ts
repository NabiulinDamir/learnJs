import { Component, OnDestroy, HostListener, effect, input, output, computed, untracked } from '@angular/core';
import * as echarts from 'echarts';
import { Theme } from '../../../../servises/theme.service';
@Component({
  selector: 'my-chart',
  templateUrl: './chart.html',
})
export class Chart implements OnDestroy {
  public name = input<string>("default")
  public option = input<any | undefined>({});
  public onClick = output<any>();
  public visible = input<boolean>(false);
  private _theme: string = '';
  private _chart: echarts.ECharts | undefined = undefined;


  constructor( public theme: Theme ) {

  }

  public updateOptionEffect = effect(() => {
    const newOption = this.option();
    this.setOption();
  })

  public changeThemeEffect = effect(() => {
    this._theme = this.theme.darkTheme() ? 'dark' : '';
    this.init();
    untracked(() => this.setOption())  
  })

  public setOption(){
    if(this.option()) { this._chart?.setOption(this.option()) }
    //console.log("set option")
  }

  public init(): void {
    const chartDom = document.getElementById(`chart-container-${this.name()}`);
    console.log("init: " + this.name() + " " + chartDom?.clientHeight)
    if(!chartDom?.clientHeight){ return };
    
    this._chart?.dispose();
    this._chart = echarts.init(chartDom, this._theme);
    this._chart.off('click');
    this._chart.on('click', (params: any) => {
      this.onClick.emit(params);
    });
  }

  ////////////////////////////////////////////////////////////////////////////////

  ngAfterViewInit() {
    this.init();
    this.setOption();
    console.log("Автер инит")
  }

  ngOnDestroy() {
    this._chart?.dispose();
    this.changeThemeEffect.destroy();
    this.updateOptionEffect.destroy();
  }

  @HostListener('window:resize')
  onWindowResize() {
    if (this._chart && this.visible()) {
      this._chart.resize();
    }
  }

  public hasData = computed(() => {
    return this.option() !== undefined;
  }) 
}
