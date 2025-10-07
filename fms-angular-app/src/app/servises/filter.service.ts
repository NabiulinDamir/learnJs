import { Injectable, EventEmitter, signal } from '@angular/core';
import { IOperation, ICategory, IFilterOption } from '../models/dataTypes.model';
import localDB from './indexDB.service';

@Injectable({ providedIn: 'root' })
export class Filter {
    public interval = signal<string>('month');
    public date = signal<Date>(new Date());

    constructor() { }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////Геттеры

    public get intervalLocale(): string {
        switch (this.interval()) {
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
        const result = new Date(this.date())
        if(!this.date()) { return new Date(); }
        result.setHours(0, 0, 0);
        if (this.interval() === "month") { result.setDate(1); }
        if (this.interval() === "year") { result.setDate(1); result.setMonth(0); result.setFullYear(result.getFullYear() - 1); }
        return result;
    }

    public get endInterval(): Date {
        const result = new Date(this.date());
        if(!this.date()) { return new Date(); }
        result.setHours(23, 59, 59);
        if (this.interval() === "month") { result.setMonth(result.getMonth() + 1, 0); }
        if (this.interval() === "year") { result.setMonth(11, 31); }
        return result;
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////Сеттеры

    public setDate(newValue: Date) {
        // console.log("Установить дату: " + newValue)
        this.date.set(newValue);
    }

    public setIntervalDay() {
        // console.log("Установить интервал дня")
        this.interval.set("day");
    }

    public setIntervalMonth() {
        // console.log("Установить интервал месяца")
        this.interval.set("month");
    }

    public setIntervalYear() {
        // console.log("Установить интервал года")
        this.interval.set("year");
    }


    /////////////////////////////////////////////////////////////////////////////////////////////////////////Фильтрация

    public filter(array: IOperation[]): IOperation[] {
        // console.log("Отфильтровать")
        if (!this.date()) { return []; }
        const startInterval = this.startInterval;
        const endInterval = this.endInterval;
        return array.filter((a) => a.date >= startInterval && a.date <= endInterval);
    }
}
