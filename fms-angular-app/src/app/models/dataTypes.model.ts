export interface IOperation {
  type: string;
  value: number;
  date: Date;
  category: string;
}

export interface ICategory {
  type: string;
  name: string;
}

export interface IFilterOption {
  length: string;               // 'day' || 'month' || 'year'
  date: Date;                   // {dateObject}- выбранный день-месяц-год
}

export interface ISortOption {
  factor: string;               //'value' || 'category' || 'date'
  increasing: boolean;          // true || false
}

export type MixedType = IOperation | ICategory | IFilterOption | ISortOption;
