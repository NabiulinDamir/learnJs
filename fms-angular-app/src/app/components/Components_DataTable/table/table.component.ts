import { Component, input, output, computed, model } from '@angular/core';
import { IOperation } from '../../../models/dataTypes.model';
import { DatePipe } from '@angular/common';
import { SelectableDirective } from '../../../directives/selectable.directive';
import { Sort } from './sort.service';
import { Theme } from '../../../servises/theme.service';


@Component({
  selector: 'my-table',
  templateUrl: './table.html',
  imports: [DatePipe, SelectableDirective],
  providers: [Sort],
})
export class Table {
  inputData = input<IOperation[]>([]);
  isLoaded = input<boolean>(true);
  selectedData = model<IOperation[]>([]);
  onEditDataClick = output<IOperation>();

  constructor(protected sortService: Sort, public theme: Theme) { }

  sortedData = computed(() => this.sortService.sort(this.inputData()));

  ///////////////////////////////////////////////////////////////////////

  toggleData(data: IOperation): void {
    this.selectedData.update((current) => {
      if (!current.includes(data)) {
        return [...current, data];
      } else {
        return current.filter((a) => a != data);
      }
    });
  }

  public clearSelectedData(): void {
    this.selectedData.update((current) => []);
  }

  isNotLastChildElement(event: MouseEvent) {
    const target = event.target as HTMLElement;
    return target.closest('td:last-child')
  }

  ///////////////////////////////////////////////////////////////////////

  setFilterOptionValue(): void {
    this.sortService.setOption('value');
  }

  setFilterOptionCategory(): void {
    this.sortService.setOption('category');
  }

  setFilterOptionDate(): void {
    this.sortService.setOption('date');
  }

  setFilterOptionTime(): void {
    this.sortService.setOption('time');
  }
  ///////////////////////////////////////////////////////////////////////

  editData(data: IOperation) {
    this.onEditDataClick.emit(data)
  }

}
