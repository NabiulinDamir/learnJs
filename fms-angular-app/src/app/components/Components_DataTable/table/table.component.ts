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

  public sortedData = computed((): IOperation[] => this.sortService.sort(this.inputData()));

  ///////////////////////////////////////////////////////////////////////

  public toggleData(data: IOperation): void {
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

  public isNotLastChildElement(event: MouseEvent) {
    const target = event.target as HTMLElement;
    return target.closest('td:last-child')
  }

  ///////////////////////////////////////////////////////////////////////

  public setFilterOptionValue(): void {
    this.sortService.setValue();
  }

  public setFilterOptionCategory(): void {
    this.sortService.setCategory();
  }

  public setFilterOptionDate(): void {
    this.sortService.setDate();
  }

  public setFilterOptionTime(): void {
    this.sortService.setTime();
  }
  ///////////////////////////////////////////////////////////////////////

  public editData(data: IOperation): void {
    this.onEditDataClick.emit(data)
  }

}
