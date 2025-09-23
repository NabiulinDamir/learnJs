import { Injectable, input } from '@angular/core';
import { IOperation } from '../../models/dataTypes.model';

@Injectable()
export class Sort {
  private _option: string = '';
  private _increasing: boolean = true;

  public setOption(optionName: string): void {
    console.log(this._option, this._increasing);
    if (optionName !== this._option) {
      this._option = optionName;
      this._increasing = true;
      return;
    }
    if (this._increasing) {
      this._increasing = !this._increasing;
      return;
    }
    this._option = '';
    this._increasing = true;
  }

  public getMarker(option: string): string {
    if (option !== this._option) {
      return '';
    }
    if (!this._increasing) {
      return ' ᨈ';
    }
    return ' ᨆ';
  }

  public sort(array: IOperation[]): IOperation[] {
    let result: IOperation[] = [];
    const koef = this._increasing ? -1 : 1
    switch (this._option) {
      case 'value':
        result = array.sort((a, b) => (b.value - a.value) * koef);
        break;
      case 'date':
        result = array.sort((a, b) => (b.date.getTime() - a.date.getTime()) * koef);
        break;
      case 'category':
        result = array.sort((a, b) => {
          return (b.category.localeCompare(a.category) * koef);
        });
        break;
      default:
        result = array;
        break;
    }
    return result;
  }
}
