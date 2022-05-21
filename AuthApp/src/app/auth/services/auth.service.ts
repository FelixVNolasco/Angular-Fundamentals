import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { AuthResponse } from '../interfaces/auth.interface';
import {catchError, map, tap} from 'rxjs/operators'
import { of, Observable } from 'rxjs';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  
  private baseUrl: string = environment.baseUrl;
  private _user!: User;

  constructor(private http: HttpClient) { }

  get user(){
    return {...this._user};
  }

  signup(name: string, email: string, password: string) {
    const url = `${this.baseUrl}/auth/new`;
    const body = {name, email, password};
    return this.http.post<AuthResponse>(url, body).pipe(
      tap((res) => {
        if(res.ok) {
          localStorage.setItem('token', res.token!);
        }
      }),
      map((resp) => resp.ok),
      catchError( (err) => of(err.error.msg))      
    )
  }

  login(email: string, password: string) {
    const url = `${this.baseUrl}/auth`;
    const body = {email, password};
    return this.http.post<AuthResponse>(url, body).pipe(
      tap((res) => {
        if(res.ok) {
          localStorage.setItem('token', res.token!);
        }
      }),
      map((resp) => resp.ok),
      catchError( (err) => of(err.error.msg))
    )
  }

  validarToken(): Observable<boolean> {
    const url = `${this.baseUrl}/auth/renew`;
    const headers = new HttpHeaders().set(
      'x-token',
      localStorage.getItem('token') || ''
    );
    return this.http.get<AuthResponse>(url, {headers}).pipe(
      map((resp) => {
        
          localStorage.setItem('token', resp.token!);
          this._user = {
            name: resp.name!,
            uid: resp.uid!,
            email: resp.email!
          }
        
        return resp.ok;
      }),
      catchError( error => of(false))
    );
  };

  logout() {
    localStorage.removeItem('token');
  }

}