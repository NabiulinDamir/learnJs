import {
  Injectable,
  EventEmitter,
  signal,
  Renderer2,
  Inject,
  DOCUMENT,
  effect,
  afterNextRender,
} from '@angular/core';

@Injectable({ providedIn: 'root' })
export class Theme {
  public darkTheme = signal<boolean>(false);

  constructor(@Inject(DOCUMENT) private document: Document) {}

  public toggleDarkTheme(): void {
    this.darkTheme.set(!this.darkTheme());
    this.document.body.classList.toggle('dark-theme');
  }
}
