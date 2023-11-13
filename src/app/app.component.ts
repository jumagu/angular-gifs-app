import { Component } from '@angular/core';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private appService: AppService) {}

  public onClickWindow(): void {
    if (this.appService.btn === 'show' && this.appService.dropdown === 'show') {
      this.appService.btn = '';
      this.appService.dropdown = '';
    }
  }
}
