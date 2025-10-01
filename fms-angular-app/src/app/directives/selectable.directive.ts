import {
  Directive,
  HostListener,
  Input,
  ElementRef,
  Renderer2,
  SimpleChanges,
} from '@angular/core';

@Directive({
  selector: '[selectable]',
  standalone: true,
})
export class SelectableDirective {
  @Input() selected: boolean = true;
  private _brightness: number = 100;

  constructor(private element: ElementRef, private renderer: Renderer2) {
    this.renderer.setStyle(this.element.nativeElement, 'cursor', 'pointer');
    this.renderer.setStyle(this.element.nativeElement, 'tr', 'pointer');
    this.renderer.setStyle(this.element.nativeElement, 'transition', '100ms'); 
    // this.renderer.setStyle(this.element.nativeElement, 'user-select', 'none');
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selected']) {
      if (this.selected) {
        this.setBrightness(-10);
      } else {
        if(this._brightness <= 90){this.setBrightness(10)}
        
      }
    }
  }

  setBrightness(value: number): void {
    this._brightness += value;
    this.renderer.setStyle(
      this.element.nativeElement,
      'filter',
      `brightness(${this._brightness}%)`
    );
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.setBrightness(-5);
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.setBrightness(5);
  }
}
