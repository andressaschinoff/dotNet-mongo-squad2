import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Login } from 'src/app/Shared/professor.interfaces';
import { Responsavel } from 'src/app/Shared/resposavel.interfaces';

const options = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class ResponsavelService {
  constructor(private http: HttpClient) {}

  fazerLogin(login: Login) {
    return this.http
      .post<Login>(`${environment.apiUrl}/login`, login, options)
      .pipe(tap((data) => data));
  }

  save(responsavel: Responsavel): Observable<any> {
    return this.http
      .post(`${environment.apiUrl}/responsavel`, responsavel, options)
      .pipe(
        tap((data) => {
          data;
        })
      );
  }
}
