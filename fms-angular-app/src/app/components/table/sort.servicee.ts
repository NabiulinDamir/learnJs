import { Injectable, input } from '@angular/core';
import { IOperation } from '../../models/dataTypes.model';

@Injectable()
export class Sort {
  private _option: string = 'date';
  private _increasing: boolean = false;

  public setOption(optionName: string): void {
    if (optionName !== this._option) {
      this._option = optionName;
      this._increasing = false;
      return;
    }
    if (!this._increasing) {
      this._increasing = true;
      return;
    }
    this._option = 'date';
    this._increasing = false;
   
  }

  public getMarker(option: string): string {
    if (option !== this._option) {
      return '';
    }
    if (this._increasing) {
      return ' ᨈ';
    }
    return ' ᨆ';
  }

  public sort(array: IOperation[]): IOperation[] {//!!!Оптимизация мертва!!!
    let result: IOperation[] = [];
    // console.log("Сортировка");
    const koef = this._increasing ? -1 : 1;
    switch (this._option) {
      case 'value':
        result = array.sort((a, b) => (b.value - a.value) * koef);
        break;
      case 'date':
        result = array.sort((a, b) => (b.date.getTime() - a.date.getTime()) * koef);
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
