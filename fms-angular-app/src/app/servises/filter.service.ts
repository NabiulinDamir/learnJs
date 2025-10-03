import { Injectable, EventEmitter } from '@angular/core';
import { IOperation, ICategory, IFilterOption } from '../models/dataTypes.model';
import localDB from './indexDB.service';

@Injectable({ providedIn: 'root' })
export class Filter {
    private _interval: string = 'year';
    private _date: Date = new Date();

    onIntervalChanged = new EventEmitter<string>();
    onDateChange = new EventEmitter<Date>();

    constructor() { }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////Геттеры

    public get date(): Date {
        return this._date;
    }

    public get interval(): string {
        return this._interval;
    }

    public get formatDate(): string {
        return ""
    }

    public get datePattern(): string {
        switch (this._interval) {
            case "day":
            case "nedela":
                return "dd.MM.yyyy";
            case "month":
                return "MM.yyyy";
            case "year":
                return "yyyy";
            default:
                return "dd.MM.yyyy";
        }
    }

    public get intervalLocale(): string {
        switch (this._interval) {
            case "day":
                return "день";
            case "month":
                return "месяц";
            case "year":
                return "год";
            default:
                return "пасхалка";
        }
    }

    public get startInterval(): Date {
        const result = new Date(this._date)
        result.setHours(0, 0, 0);
        if (this._interval === "month") { result.setDate(1); }
        if (this._interval === "year") { result.setDate(1); result.setMonth(0); }
        return result;
    }

    public get endInterval(): Date {
        const result = new Date(this._date);
        result.setHours(23, 59, 59);
        if (this._interval === "month") { result.setMonth(result.getMonth() + 1, 0) }
        if (this._interval === "year") { result.setMonth(11, 31); }
        return result;
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////Сеттеры

    public set date(newValue: Date) {
        if (newValue === this._date) { return; }
        this._date = newValue;
        this.onDateChange.emit(this._date);
    }

    public set interval(newValue: string) {
        if (newValue === this._interval) { return; }
        if (['day', 'month', 'year'].includes(newValue)) {
            this._interval = newValue
            this.onIntervalChanged.emit(this._interval);
        }
        else { console.error(`Не валидный интервал: ${newValue}`) }
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////Создатторы



    /////////////////////////////////////////////////////////////////////////////////////////////////////////Обновлятторы


    /////////////////////////////////////////////////////////////////////////////////////////////////////////Удалятторы



    /////////////////////////////////////////////////////////////////////////////////////////////////////////Фильтрация

    public filter(array: IOperation[]): IOperation[] {
        switch (this._interval) {
            case 'day':
                return array.filter(
                    (a) => a.date &&
                        (a.date.getDate() === this._date.getDate()) &&
                        (a.date.getMonth() === this._date.getMonth()) &&
                        (a.date.getFullYear() === this._date.getFullYear())
                );
            case 'month':
                return array.filter(
                    (a) => a.date &&
                        (a.date.getMonth() === this._date.getMonth()) &&
                        (a.date.getFullYear() === this._date.getFullYear())
                );
            case 'year':
                return array.filter(
                    (a) => (a.date && a.date.getFullYear() === this._date.getFullYear())
                );
            case 'all':
                return array;
        }
        return array;
    }

}
