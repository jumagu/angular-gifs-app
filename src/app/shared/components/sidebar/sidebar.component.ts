import { AfterContentInit, Component } from '@angular/core';

import { Offcanvas } from 'bootstrap';

import { GifsService } from 'src/app/gifs/services/gifs.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements AfterContentInit {
  private sidebarMenuHtml?: HTMLElement | null;
  private sidebarMenuBootstrap?: Offcanvas;

  constructor(private gifsService: GifsService) {}

  ngAfterContentInit(): void {
    this.sidebarMenuHtml = document.getElementById('sidebarMenu');

    if (this.sidebarMenuHtml) {
      this.sidebarMenuBootstrap = Offcanvas.getOrCreateInstance(
        this.sidebarMenuHtml
      );
    }
  }

  public onCloseSideBar(): void {
    this.sidebarMenuBootstrap?.hide();
  }

  public get tags(): string[] {
    return this.gifsService.tagsHistory;
  }

  public searchGifByTag(tag: string): void {
    this.gifsService.searchTag(tag);
  }

  public deleteTag(tag: string): void {
    this.gifsService.deleteTag(tag);
  }
}
