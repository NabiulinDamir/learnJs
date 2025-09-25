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
  date = input<Date>(new Date());

  myForm = new FormGroup({
    number: new FormControl(this.number(), [
      CustomValidators.required,
      CustomValidators.positiveNumber,
      CustomValidators.notNull,
    ]),
    selector: new FormControl('', [CustomValidators.required, CustomValidators.minLength]),
    date: new FormControl(this.date().toISOString().split('T')[0], [
      CustomValidators.required,
      Validators.maxLength(10),
    ]),
  });

  public submit(): void {
    this.myForm.markAllAsTouched();
    if (!this.myForm.valid) return;

    alert(
        this.myForm.value.number +
        ' | ' +
        this.myForm.value.selector +
        ' | ' +
        this.myForm.value.date
    );
  }

  clear():void{
    this.myForm.reset({}, { emitEvent: false });
  }

  setDefault():void{
     this.myForm.patchValue({
       number: 0,
       selector: '',
       date: new Date().toISOString().split('T')[0],
     });
  }
}
