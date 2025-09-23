import { Component, input, output,  } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'my-modal',
  templateUrl: './modal.html',
  imports: [CommonModule],
})
export class Modal {
  isVisible: boolean = false;
  title = input<string>('Модалка');

  readonly close = output<void>();
  readonly deny = output<void>();
  readonly confirm = output<void>();

  show() {
    this.isVisible = true;
  }
  hide() {
    this.isVisible = false;
  }
}
