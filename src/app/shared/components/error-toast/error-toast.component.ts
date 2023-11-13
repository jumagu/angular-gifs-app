import { AfterViewInit, Component, OnInit } from '@angular/core';

import { Toast } from 'bootstrap';

import { GifsService } from 'src/app/gifs/services/gifs.service';

@Component({
  selector: 'shared-error-toast',
  templateUrl: './error-toast.component.html',
  styleUrls: ['./error-toast.component.css'],
})
export class ErrorToastComponent implements OnInit, AfterViewInit {
  public toast?: HTMLElement | null;
  public toastBootstrap?: Toast;

  constructor(private gifsService: GifsService) {}

  ngOnInit(): void {
    this.gifsService.noResultsFound.subscribe((value) => {
      if (value) {
        this.toastBootstrap?.show();
      } else {
        this.toastBootstrap?.hide();
      }
    });
  }

  ngAfterViewInit(): void {
    this.toast = document.getElementById('liveToast');

    if (this.toast) {
      this.toastBootstrap = Toast.getOrCreateInstance(this.toast, {
        delay: 3000,
      });
    }
  }
}
