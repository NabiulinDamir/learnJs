import { Component, input, output, computed, model, effect, OnInit, SimpleChanges, Input } from '@angular/core';
import { ICategory, IOperation } from '../../models/dataTypes.model';
import { DecimalPipe, DatePipe, CurrencyPipe } from '@angular/common';
import { SelectableDirective } from '../../directives/selectable.directive';
import { Sort } from './sort.servicee';
import { LocalStorage } from '../../servises/LocalStorage.service';


@Component({
  selector: 'my-table',
  templateUrl: './table.html',
  imports: [DatePipe, SelectableDirective],
  providers: [Sort],
})
export class Table {
  title = input<string>('');
  inputData = input<IOperation[]>([]);
  isLoaded  = input<boolean>(true);
  data: IOperation[] = [];
  selectedData = model<IOperation[]>([]);
  onSelectedDataChanged = output<void>();
  onEditDataClick = output<IOperation>();


  constructor(protected sortService: Sort, localStorage: LocalStorage) {}


  filterDara = computed(() => {
    return this.sortService.sort(this.inputData());
  })

  ///////////////////////////////////////////////////////////////////////

  toggleData(data: IOperation): void {
    this.selectedData.update((current) => {
      if (!current.includes(data)) {
        return [...current, data];
      } else {
        return current.filter((a) => a != data);
      }
    });
    this.onSelectedDataChanged.emit();
  }

  clearSelectedData(): void {
    this.selectedData.update((current) => []);
  }

  isNotLastChildElement(event: MouseEvent) {
    const target = event.target as HTMLElement;
    return target.closest('td:last-child')
  }

  ///////////////////////////////////////////////////////////////////////

  setFilterOptionValue(): void {
    this.sortService.setOption('value');
    // this.sortData();
  }

  setFilterOptionCategory(): void {
    this.sortService.setOption('category');
    // this.sortData();
  }

  setFilterOptionDate(): void {
    this.sortService.setOption('date');
    // this.sortData();
  }

  public sortData(): void {
    // console.log('hui', this.inputData.length)
    // if (!this.inputData.length) return;
    // this.data = this.sortService.sort(this.inputData);
  }

  ///////////////////////////////////////////////////////////////////////

  editData(data: IOperation) {
    this.onEditDataClick.emit(data)
  }

  get validData():boolean{
    console.log("huhui")
    return this.data.length > 0
  }



}
