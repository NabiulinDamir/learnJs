import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Theme } from '../../../servises/theme.service';
@Component({
  selector: 'my-modal',
  templateUrl: './modal.html',
  imports: [CommonModule],
})
export class Modal {
  isVisible: boolean = false;
  isLoaded = input<boolean>(false);
  title = input<string>('Модалка');

  readonly close = output<void>();
  readonly deny = output<void>();
  readonly confirm = output<void>();

  constructor(public theme: Theme) {}

  show(): void {
    this.isVisible = true;
  }
  hide(): void {
    this.isVisible = false;
  }
}
