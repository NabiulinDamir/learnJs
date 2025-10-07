import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DateFormatter {
  toStringRevers(value: Date = new Date()): string {
    return value.toISOString().split('T')[0];
  }

  toString(value: Date = new Date()): string {
    return value.toISOString().split('T')[0].split('-').reverse().join('.');
  }
}
