import { Directive, Input, ElementRef, Renderer2, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[movable]',
  standalone: true,
})
export class MovableDirective {
  @Input() left: number = 0;

  constructor(private element: ElementRef, private renderer: Renderer2) {
    this.renderer.setStyle(this.element.nativeElement, 'transition', 'left 200ms ease-in-out');
    this.renderer.setStyle(this.element.nativeElement, 'position', 'relative');
  }

  move() {
    this.renderer.setStyle(this.element.nativeElement, 'left', `${this.left}px`);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['left']) {
      this.move();
    }
  }
}
