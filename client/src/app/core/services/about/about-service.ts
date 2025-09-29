import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { About } from '../../interfaces/IAbout';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AboutService {
  constructor(private _http: HttpClient) {}
  private apiUrl = environment.apiUrl + '/about-us';
  getAbout(): Observable<About> {
    return this._http.get<About>(this.apiUrl);
  }
}
