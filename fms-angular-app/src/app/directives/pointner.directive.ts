import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[pointner]',
  standalone: true,
})
export class PointnerDirective {
  constructor(private element: ElementRef, private renderer: Renderer2) {
    this.renderer.setStyle(this.element.nativeElement, 'cursor', 'pointer');
    this.renderer.setStyle(this.element.nativeElement, 'user-select', 'none');
  }
}
