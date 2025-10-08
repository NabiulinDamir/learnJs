import { Component, input, output } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { CustomValidators } from './validator';

@Component({
  selector: 'my-form',
  templateUrl: './form.html',
  imports: [ReactiveFormsModule],
})
export class Form {
  number = input<number>(0);
  selectorItems = input<string[]>();
  date = new Date();
  onSubmit = output<{ value: number; category: string; date: Date }>({});

  myForm = new FormGroup({
    value: new FormControl(this.number(), [
      CustomValidators.required,
      CustomValidators.positiveNumber,
      CustomValidators.notNull,
    ]),
    category: new FormControl('', [CustomValidators.required, CustomValidators.minLength]),
    date: new FormControl(this.formatDateToString(this.date), [
      CustomValidators.required,
      Validators.maxLength(10),
    ]),
  });

  public submit(): void {
    this.myForm.markAllAsTouched();
    if (!this.myForm.valid) return;
    this.onSubmit.emit({
      value: <number>this.myForm.value.value,
      date: new Date(
        new Date(<string>this.myForm.value.date).setHours(
          this.date.getHours(),
          this.date.getMinutes(),
          this.date.getSeconds()
        )
      ),
      category: <string>this.myForm.value.category,
    });
  }

  clear(): void {
    this.myForm.reset({}, { emitEvent: false });
  }

  setDefault(): void {
    this.myForm.patchValue({
      value: 0,
      category: '',
      date: this.formatDateToString(new Date()),
    });
  }

  ////////////////////////////////////////////////////////////////////////

  setValue(newValue: number): void {
    this.myForm.patchValue({
      value: newValue,
    });
  }

  setDate(newDate: Date): void {
    this.date = newDate;
    this.myForm.patchValue({
      date: this.formatDateToString(newDate),
    });
    console.log(this.date);
  }

  setCategory(newCategoiry: string): void {
    this.myForm.patchValue({
      category: newCategoiry,
    });
  }

  ////////////////////////////////////////////////////////////////////////

  formatDateToString(date: Date = new Date()) {
    return date.toISOString().split('T')[0];
  }
}
