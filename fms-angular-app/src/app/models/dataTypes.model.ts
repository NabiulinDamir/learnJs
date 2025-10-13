export interface IOperation{
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

export interface IFilterOption {
  length: string;               // 'day' || 'month' || 'year'
  date: Date;                   // {dateObject}- выбранный день-месяц-год
}

