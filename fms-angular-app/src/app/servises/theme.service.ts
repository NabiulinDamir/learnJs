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

  public setDarkTheme(): void {
    this.darkTheme.set(true);
    this.document.body.classList.add('dark-theme');
  }

  public setWhiteTheme(): void {
    this.darkTheme.set(false);
    this.document.body.classList.remove('dark-theme');
  }
}
