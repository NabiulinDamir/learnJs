import { Component, input, output } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { CustomValidators } from './validator';

@Component({
  selector: 'my-form',
  templateUrl: './form.html',
  imports: [ReactiveFormsModule],
})
export class Form {
  public number = input<number>(0);
  public selectorItems = input<string[]>();
  public tmpDate = new Date();
  public onSubmit = output<{ value: number; category: string; date: Date }>({});

  public myForm = new FormGroup({
    value: new FormControl<number | undefined>(this.number(), [
      CustomValidators.required,
      CustomValidators.positiveNumber,
      CustomValidators.notNull,
    ]),
    category: new FormControl<string | undefined>('', [CustomValidators.required, CustomValidators.minLength]),
    date: new FormControl<string | undefined>(this.formatDateToString(this.tmpDate), [
      CustomValidators.required,
      Validators.maxLength(10),
    ]),
  });

  public  submit(): void {
    this.myForm.markAllAsTouched();
    if (!this.myForm.valid) return;
    this.onSubmit.emit({
      value: <number>this.myForm.value.value,
      date: new Date(
        new Date(<string>this.myForm.value.date).setHours(
          this.tmpDate.getHours(),
          this.tmpDate.getMinutes(),
          this.tmpDate.getSeconds()
        )
      ),
      category: <string>this.myForm.value.category,
    });
  }

  public clear(): void {
    this.myForm.reset({}, { emitEvent: false });
  }

  public setDefault(): void {
    this.myForm.patchValue({
      value: 0,
      category: '',
      date: this.formatDateToString(new Date()),
    });
  }

  ////////////////////////////////////////////////////////////////////////

  public setValue(newValue: number): void {
    this.myForm.patchValue({
      value: newValue,
    });
  }

  public setDate(newDate: Date): void {
    this.tmpDate = newDate;
    this.myForm.patchValue({
      date: this.formatDateToString(newDate),
    });
  }

  public setCategory(newCategoiry: string): void {
    this.myForm.patchValue({
      category: newCategoiry,
    });
  }

  ////////////////////////////////////////////////////////////////////////

  public formatDateToString(date: Date = new Date()): string {
    return date.toISOString().split('T')[0];
  }
}
