import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  _item: string = 'hui';
  constructor() {}
  public get item(): string {
    return this._item;
  }
}
