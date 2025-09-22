import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'my-modal',
  templateUrl: './modal.html',
  imports: [CommonModule],
})
export class Modal {
  isVisible: boolean = true;
  title = input<string>('Модалка');
  show() {
    this.isVisible = true;
  }
  hide() {
    this.isVisible = false;
  }

//   ngOnInit() {
//     const myModal = <HTMLElement>document.getElementById('myModal');
//     const myInput = <HTMLElement>document.getElementById('myInput');

//     myModal.addEventListener('shown.bs.modal', () => {
//       myInput.focus();
//     });
//   }
}
