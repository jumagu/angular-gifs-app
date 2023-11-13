import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  // Theme dropdown
  public btn: string = '';
  public dropdown: string = '';

  constructor(@Inject(DOCUMENT) private document: Document) {}

  public switchTheme(theme: string): void {
    localStorage.setItem('theme', theme);

    let themeLink = this.document.body;

    if (themeLink) {
      themeLink.dataset['bsTheme'] = theme;
    }
  }
}
