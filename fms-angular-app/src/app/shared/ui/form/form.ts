import { Component, input, output } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormControl } from '@angular/forms';

@Component({
  selector: 'my-form',
  templateUrl: './form.html',
  imports: [ReactiveFormsModule],
})
export class Form {
  number = input<number>(0);
  //   outputNumber = output<number>();

  selector = input<string[]>();
  //   outputSelector = output<string>();

  date = input<Date>();
  //   outputDate = output<Date>();

  myForm = new FormGroup({
    number: new FormControl(0),
    selector: new FormControl(''),
    date: new FormControl(new Date()),
  });

  get isFormValid():boolean{
    return <number>this.myForm.value.number > 0
  }

  handleSubmit():void {
    alert(
      this.myForm.value.number + ' | ' + this.myForm.value.selector + ' | ' + this.myForm.value.date
    );
  }
}
