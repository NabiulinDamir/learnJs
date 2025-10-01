import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DateFormatter {
  
    toStringRevers(value: Date = new Date): string{
        return value.toISOString().split('T')[0]
    }

    toString(value: Date = new Date): string{
        return value.toISOString().split('T')[0].split('-').reverse().join(".")
    }

    // format(date: Date, pattern: string = "dd.MM.YYYY"): string | number{
    //     const result: string = pattern
    //     const includeDay: number = pattern.indexOf("dd")
    //     if(includeDay > -1){
    //         result.replace(0, 2)
    //     }
    //     return(includeDay)
    // }

  


}
