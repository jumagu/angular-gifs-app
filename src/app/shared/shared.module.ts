import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ThemeFabComponent } from './components/theme-fab/theme-fab.component';
import { LazyImageComponent } from './components/lazy-image/lazy-image.component';
import { ErrorToastComponent } from './components/error-toast/error-toast.component';

@NgModule({
  declarations: [
    NavbarComponent,
    SidebarComponent,
    ThemeFabComponent,
    LazyImageComponent,
    ErrorToastComponent,
  ],
  imports: [CommonModule],
  exports: [
    NavbarComponent,
    SidebarComponent,
    ThemeFabComponent,
    LazyImageComponent,
    ErrorToastComponent,
  ],
})
export class SharedModule {}
