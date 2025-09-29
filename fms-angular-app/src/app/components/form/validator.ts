import { AbstractControl, Validators } from '@angular/forms';

export class CustomValidators {
  /////////////////////////////////////////////////////////////////numbers
  static positiveNumber(control: AbstractControl) {
    if (control.value >= 0) return null;
    return { text: 'Число должно быть положительным' };
  }

  static notNull(control: AbstractControl) {
    if (control.value != 0) return null;
    return { text: 'Нельзя ноль' };
  }

  static required(control: AbstractControl) {
    if (control.value) return null;
    return { text: 'Обязательное поле' };
  }

  /////////////////////////////////////////////////////////////////string

  static minLength(control: AbstractControl) {
    if (control.value?.length > 1) return null;
    return { text: 'Длина меньше 2х символов' };
  }
}
