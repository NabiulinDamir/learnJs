import { Injectable, signal, computed } from '@angular/core';
import { IOperation } from '../../../models/dataTypes.model';

enum SortOption {
  DATE,
  VALUE,
  TIME,
  CATEGORY,
}

@Injectable()
export class Sort {


  private _option = signal<SortOption>(SortOption.DATE);
  private _increasing = signal<boolean>(false);

  private set option(option: SortOption) {
    if (option !== this._option()) {
      this._option.set(option);
      this._increasing.set(false);
      return;
    }
    if (!this._increasing()) {
      this._increasing.set(true);
      return;
    }
    this._option.set(SortOption.DATE);
    this._increasing.set(false);
  }

  public marker = computed(() => {
    if (this._option() === SortOption.DATE && !this._increasing()) return ""
    return this._increasing() ? ' ᨈ' : ' ᨆ'
  })

  public sort(array: IOperation[]) {
    //console.log('Сортировка');
    const koef = this._increasing() ? -1 : 1;
    switch (this._option()) {
      case SortOption.VALUE:
        return array.sort((a, b) => (b.value - a.value) * koef);
      case SortOption.DATE:
        return array.sort((a, b) => (b.date.getTime() - a.date.getTime()) * koef);
      case SortOption.TIME:
        return array.sort(
          (a, b) =>
            (b.date.getHours() - a.date.getHours() ||
              b.date.getMinutes() - a.date.getMinutes() ||
              b.date.getSeconds() - a.date.getSeconds()) * koef
        );
      case SortOption.CATEGORY:
        return array.sort((a, b) => {
          return b.category.localeCompare(a.category) * koef;
        });
      default:
        return array;

    }
  }

  public get isValue(): boolean { return this._option() === SortOption.VALUE; }

  public get isDate(): boolean { return this._option() === SortOption.DATE; }

  public get isTime(): boolean { return this._option() === SortOption.TIME; }

  public get isCategory(): boolean { return this._option() === SortOption.CATEGORY; }

  public setValue(): void { this.option = SortOption.VALUE; }

  public setDate(): void { this.option = SortOption.DATE; }

  public setTime(): void { this.option = SortOption.TIME; }

  public setCategory(): void { this.option = SortOption.CATEGORY; }
}

