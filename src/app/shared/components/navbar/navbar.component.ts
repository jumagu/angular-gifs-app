import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

import { Collapse, Offcanvas } from 'bootstrap';

import { GifsService } from 'src/app/gifs/services/gifs.service';

@Component({
  selector: 'shared-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements AfterViewInit {
  @ViewChild('txtTagInput') public tagInput!: ElementRef<HTMLInputElement>;
  private navbarSearchHtml?: HTMLElement | null;
  private navbarSearchBootstrap?: Collapse;

  private sidebarMenuHtml?: HTMLElement | null;
  private sidebarMenuBootstrap?: Offcanvas;

  constructor(private gifsService: GifsService) {}

  ngAfterViewInit(): void {
    this.navbarSearchHtml = document.getElementById('navbarSearch');

    if (this.navbarSearchHtml) {
      this.navbarSearchBootstrap = Collapse.getOrCreateInstance(
        this.navbarSearchHtml,
        { toggle: false }
      );
    }

    this.sidebarMenuHtml = document.getElementById('sidebarMenu');

    if (this.sidebarMenuHtml) {
      this.sidebarMenuBootstrap = Offcanvas.getOrCreateInstance(
        this.sidebarMenuHtml
      );
    }
  }

  public toggleSearchBarVisivility(): void {
    this.navbarSearchBootstrap?.toggle();
  }

  public onOpenSideBar(): void {
    this.sidebarMenuBootstrap?.show();
  }

  public searchTag() {
    const newTag = this.tagInput.nativeElement.value;

    this.gifsService.searchTag(newTag);

    this.tagInput.nativeElement.value = '';
  }
}
