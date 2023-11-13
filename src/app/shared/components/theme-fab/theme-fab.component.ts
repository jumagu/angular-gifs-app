import { Component } from '@angular/core';

import { AppService } from 'src/app/app.service';

@Component({
  selector: 'shared-theme-fab',
  templateUrl: './theme-fab.component.html',
  styleUrls: ['./theme-fab.component.css'],
})
export class ThemeFabComponent {
  public themeIcon = 'bi-sun-fill';

  public darkOption: string = '';
  public lightOption: string = 'active';

  public darkCheck: string = 'd-none';
  public lightCheck: string = '';

  constructor(private appService: AppService) {
    const localStorageTheme = localStorage.getItem('theme');

    if (localStorageTheme) {
      this.onSelectTheme(localStorageTheme);
    }
  }

  public get btn() {
    return this.appService.btn;
  }

  public get dropdown() {
    return this.appService.dropdown;
  }

  public toggleDropdownMenu() {
    if (this.appService.btn === 'show') {
      this.appService.btn = '';
      this.appService.dropdown = '';
    } else {
      this.appService.btn = 'show';
      this.appService.dropdown = 'show';
    }
  }

  public onSelectTheme(value: string): void {
    this.appService.btn = '';
    this.appService.dropdown = '';

    if (value === 'light') {
      this.themeIcon = 'bi-sun-fill';

      this.darkOption = '';
      this.lightOption = 'active';

      this.darkCheck = 'd-none';
      this.lightCheck = '';
    } else {
      this.themeIcon = 'bi-moon-stars-fill';

      this.darkOption = 'active';
      this.lightOption = '';

      this.darkCheck = '';
      this.lightCheck = 'd-none';
    }

    this.appService.switchTheme(value);
  }
}
