import {
  Directive,
  HostListener,
  Input,
  ElementRef,
  Renderer2,
  SimpleChanges,
} from '@angular/core';

@Directive({
  selector: '[movable]',
  standalone: true,

})
export class MovableDirective {
  @Input() left: number = 0;

  constructor(private element: ElementRef, private renderer: Renderer2) {
    this.renderer.setStyle(this.element.nativeElement, 'transition', 'left 200ms ease-in-out'); 
    this.renderer.setStyle(this.element.nativeElement, 'position', 'relative');
    this.renderer.setStyle(this.element.nativeElement, 'left', `${this.left}rem`);
  }

  move(num?: number) {
    this.renderer.setStyle(this.element.nativeElement, 'left', `${this.left}rem`);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['left']) {
      this.move()
    }
  }
}
