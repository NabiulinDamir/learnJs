import { Component, input, output, computed, model, effect } from '@angular/core';
import { ICategory, IOperation } from '../../models/dataTypes.model';
import { DecimalPipe, DatePipe, CurrencyPipe } from '@angular/common';
import { SelectableDirective } from '../../directives/selectable.directive';
import { Sort } from './sort.servicee';


@Component({
  selector: 'my-table',
  templateUrl: './table.html',
  imports: [DatePipe, SelectableDirective],
  providers: [Sort],
})
export class Table {
  title = input<string>('');
  allData = input<IOperation[]>([]);
  selectedData = model<IOperation[]>([]);
  onSelectedDataChanged = output<void>();
  onEditDataClick = output<IOperation>();

  constructor(protected sortService: Sort) { }

  sortedData = computed(() => {
    if (!this.allData().length) return;
    return this.sortService.sort(this.allData());
  });
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

  valueSort(): void {
    this.sortService.setOption('value');
  }

  categorySort(): void {
    this.sortService.setOption('category');
  }

  dateSort(): void {
    this.sortService.setOption('date');
  }

  ///////////////////////////////////////////////////////////////////////

  editData(data: IOperation) {
    this.onEditDataClick.emit(data)
  }
}
