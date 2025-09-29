export interface IOperation {
  type: string;
  value: number;
  date: Date;
  category: string;
  id: number;
}

export interface ICategory {
  type: string;
  name: string;
}

// export class Operations {
//   private _value: IOperation[];

//   constructor(value: IOperation[]) {
//     this._value = value;
//   }

//   set value(value: IOperation[]) {
//     this.value = value;
//   }
//   get value(): IOperation[] {
//     return this._value;
//   }

  

// }

export interface IFilterOption {
  length: string;               // 'day' || 'month' || 'year'
  date: Date;                   // {dateObject}- выбранный день-месяц-год
}

// export interface ISortOption {
//   factor: string;               //'value' || 'category' || 'date'
//   increasing: boolean;          // true || false
// }

// export type MixedType = IOperation | ICategory;
