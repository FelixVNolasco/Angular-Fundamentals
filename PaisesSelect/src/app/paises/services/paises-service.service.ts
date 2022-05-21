import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Pais } from '../interfaces/pais.interface';
import { Paises, PaisSmall } from '../interfaces/paises.interface';

@Injectable({
  providedIn: 'root'
})
export class PaisesServiceService {
  
  private _regiones : string[] = ["Africa", "Americas", "Asia", "Europe", "Oceania"];
  private _baseUrl: string = "https://restcountries.com/v3.1"
  private _baseUrlPais: string = "https://restcountries.com/v2/alpha"
  
  get regiones(): string[] {
    return [...this._regiones];
  }

  constructor(private http: HttpClient) { }

  getPaisesPorRegion(region: string): Observable<Paises[]> {
    return this.http.get<Paises[]>(`${this._baseUrl}/region/${region}?fields=name,cca3`);
  }

  getPaisPorCodigo( codigo: string): Observable<Pais | null> {
    if(!codigo) {
      return of(null)
    }
    return this.http.get<Pais>(`${this._baseUrlPais}/${codigo}`);
  }

  getPaisPorCodigoSmall( codigo: string): Observable<PaisSmall> {
    return this.http.get<PaisSmall>(`${this._baseUrlPais}/${codigo}?fields=name,alpha3Code`);
  }
}
