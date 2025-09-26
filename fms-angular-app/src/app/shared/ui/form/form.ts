import { Component, input, output } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { CustomValidators } from './validator';
import { IOperation } from '../../../models/dataTypes.model';
@Component({
  selector: 'my-form',
  templateUrl: './form.html',
  imports: [ReactiveFormsModule],
})
export class Form {
  number = input<number>(0);
  selectorItems = input<string[]>();
  date = input<Date>(new Date());
  onSubmit = output<IOperation>({});

  myForm = new FormGroup({
    value: new FormControl(this.number(), [
      CustomValidators.required,
      CustomValidators.positiveNumber,
      CustomValidators.notNull,
    ]),
    category: new FormControl('', [CustomValidators.required, CustomValidators.minLength]),
    date: new FormControl(this.date().toISOString().split('T')[0], [
      CustomValidators.required,
      Validators.maxLength(10),
    ]),
  });

  public submit(): void {
    this.myForm.markAllAsTouched();
    if (!this.myForm.valid) return;

    this.onSubmit.emit({
      type: '',
      value: <number>this.myForm.value.value,
      date: new Date(<string>this.myForm.value.date),
      category: <string>this.myForm.value.category,
    });
  }

  clear():void{
    this.myForm.reset({}, { emitEvent: false });
  }

  setDefault():void{
     this.myForm.patchValue({
       value: 0,
       category: '',
       date: new Date().toISOString().split('T')[0],
     });
  }
}
