import { Component, input, output, computed, model, effect, viewChild, ElementRef } from '@angular/core';
import { DecimalPipe, DatePipe, CurrencyPipe } from '@angular/common';
import { SelectableDirective } from '../../directives/selectable.directive';
import { LocalStorage } from '../../servises/LocalStorage.service';
import { MovableDirective } from '../../directives/movable.directive';
import { Renderer2 } from '@angular/core';
import { PointnerDirective } from '../../directives/pointner.directive';
@Component({
  selector: 'my-date-carousel',
  template: `
  <div class="position-relative h-5 overflow-x-hidden bg-emphasis" >
    <ul #option_list class="nav position-absolute p-1 h-100 d-flex flex-nowrap " movable [left]='position' >
      @for(item of allData; track $index){
        <li class=" rounded-3 d-flex justify-content-center" 
          [style.width]='calcWidth(item.name.length)' 
          (click)="this.localStorage.setFilterOptionsDate(item.date)"
          selectable
          pointner
          [class.bg-primary]="isSameDay(item.date, localStorage.filterOption.date)"
          >{{item.name}}</li>
      }
    </ul>
  </div>

  <style> 
    .h-5{
      height: 2rem;
      overflow: hidden;
    }
  </style>
  `,
  imports: [MovableDirective, SelectableDirective, PointnerDirective],
  providers: [DatePipe],
})
export class DateCarousel {
  public position: number = 0;
  public allData: { name: string, date: Date }[] = [];
  private ELEMENT_LIST_PARRENT = viewChild<any>('option_list');

  constructor(public localStorage: LocalStorage, private datePipe: DatePipe, private renderer: Renderer2) { }

  async setData() {
    const allOperations = this.localStorage.allOperations.sort(
      (a, b) => a.date.getTime() - b.date.getTime()
    );
    this.allData = [];
    let containToday = false;
    const todayFormat = <string>this.datePipe.transform(new Date(), this.localStorage.datePattern);
    for (const operation of allOperations) {
      const name = <string>this.datePipe.transform(operation.date, this.localStorage.datePattern);
      if (this.allData.map(a => a.name).includes(name)) { continue }
      const date = new Date(operation.date)
      date.setHours(0, 0, 0, 0)
      if (this.localStorage.filterOption.length === "month") { date.setDate(1) }
      if (this.localStorage.filterOption.length === "year") { date.setMonth(0);  date.setDate(1) }
      this.allData.push({ name: name, date: date });
      if(name === todayFormat){ 
        containToday = true;
        await this.localStorage.setFilterOptionsDate(date) 
      }
    }
    if(!containToday){
      await this.localStorage.setFilterOptionsDate(this.allData[this.allData.length - 1]?.date) 
    }
  }

  ///////////////////////////////////////////////////////////////////////

  calcWidth(length: number) {
    return (11 - length) * 100 + "px"
  }

  checkChildrens() {
    setTimeout(() => {
      const children = this.ELEMENT_LIST_PARRENT().nativeElement.children;
      Array.from(children).forEach((child: unknown) => {
        const element = child as HTMLElement;
        const text = element.textContent?.trim();
        if(text === this.datePipe.transform(this.localStorage.filterOption.date, this.localStorage.datePattern)){
          this.navigateToItem(element);
        }
      });
    },100);
  }

  navigateToItem(element: HTMLElement){
    const containerWidth = window.innerWidth;
    const containerCenter = containerWidth / 2;
    const elemCenter = element.offsetLeft + (element.offsetWidth / 2);
    this.position = containerCenter - elemCenter;
  }

  ngOnInit() {
    this.localStorage.onOperationsChanged.subscribe((value) => { this.setData(); });
    this.localStorage.onFilterOptionLengthChanged.subscribe(async(value) => { await this.setData(); })
    this.localStorage.onFilterOptionDateChanged.subscribe((value) => { this.checkChildrens() })
  }

  isSameDay(date1: Date, date2: Date): boolean{
    return (date1.getTime() ===  date2.getTime())
  }

}
