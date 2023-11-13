import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { BehaviorSubject, Observable } from 'rxjs';

import { Gif, GifsResponse } from '../interfaces/gifs.interfaces';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  public gifs: Gif[] = [];

  private _noResultsFound: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  private _tagsHistory: string[] = [];
  private gifsApiKey: string = environment.gifsApiKey;
  private gifsBaseUrl: string = environment.gifsApiUrl;

  constructor(private httpClient: HttpClient) {
    this.loadLocalStorage();
  }

  public get tagsHistory(): string[] {
    return [...this._tagsHistory];
  }

  public get noResultsFound(): Observable<boolean> {
    return this._noResultsFound.asObservable();
  }

  private organizeHistory(tag: string): void {
    tag = tag.toLocaleLowerCase();

    if (this._tagsHistory.includes(tag)) {
      this._tagsHistory = this._tagsHistory.filter((oldTag) => oldTag !== tag);
    }

    this._tagsHistory.unshift(tag);

    this._tagsHistory = this._tagsHistory.splice(0, 10);
    this.saveLocalStorage();
  }

  private saveLocalStorage(): void {
    localStorage.setItem('history', JSON.stringify(this._tagsHistory));
  }

  private loadLocalStorage(): void {
    if (!localStorage.getItem('history')) return;

    this._tagsHistory = JSON.parse(localStorage.getItem('history')!);

    if (this._tagsHistory.length === 0) return;

    this.searchTag(this._tagsHistory[0]);
  }

  public searchTag(tag: string): void {
    if (tag.trim().length === 0) return;

    const params = new HttpParams()
      .set('api_key', this.gifsApiKey)
      .set('limit', '12')
      .set('q', tag);

    this.httpClient
      .get<GifsResponse>(`${this.gifsBaseUrl}/search`, { params })
      .subscribe({
        next: (res) => {
          if (res.data.length === 0) {
            this._noResultsFound.next(true);
            return;
          }

          this._noResultsFound.next(false);
          this.organizeHistory(tag);
          this.gifs = res.data;
        },
        error: (err) => {
          this._noResultsFound.next(true);
        },
      });
  }

  public deleteTag(tag: string): void {
    if (tag === this._tagsHistory[0] && this._tagsHistory.length > 1) {
      this._tagsHistory = this._tagsHistory.filter((t) => t !== tag);
      this.searchTag(this._tagsHistory[0]);
      this.saveLocalStorage();
      return;
    }

    this._tagsHistory = this._tagsHistory.filter((t) => t !== tag);
    this.saveLocalStorage();

    if (this._tagsHistory.length === 0) {
      this.gifs = [];
    }
  }
}
