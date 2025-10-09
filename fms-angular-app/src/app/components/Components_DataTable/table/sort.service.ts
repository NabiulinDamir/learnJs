import { Injectable, input, signal } from '@angular/core';
import { IOperation } from '../../../models/dataTypes.model';

@Injectable()
export class Sort {
  private _option = signal<string>('date');
  private _increasing = signal<boolean>(false);

  public setOption(optionName: string): void {
    if (optionName !== this._option()) {
      this._option.set(optionName);
      this._increasing.set(false);
      return;
    }
    if (!this._increasing()) {
      this._increasing.set(true);
      return;
    }
    this._option.set('date');
    this._increasing.set(false);
  }

  public getMarker(option: string): string {
    if (option !== this._option()) {
      return '';
    }
    if (this._increasing()) {
      return ' ᨈ';
    }
    return ' ᨆ';
  }

  public sort(array: IOperation[]): IOperation[] {
    //!!!Оптимизация не мертва ура!!!
    let result: IOperation[] = [];
    // console.log('Сортировка');
    const koef = this._increasing() ? -1 : 1;
    switch (this._option()) {
      case 'value':
        result = array.sort((a, b) => (b.value - a.value) * koef);
        break;
      case 'date':
        result = array.sort((a, b) => (b.date.getTime() - a.date.getTime()) * koef);
        break;
      case 'time':
        result = array.sort(
          (a, b) =>
            (b.date.getHours() - a.date.getHours() ||
              b.date.getMinutes() - a.date.getMinutes() ||
              b.date.getSeconds() - a.date.getSeconds()) * koef
        );
        break;
      case 'category':
        result = array.sort((a, b) => {
          return b.category.localeCompare(a.category) * koef;
        });
        break;
      default:
        result = array;
        break;
    }
    return result;
  }
}
