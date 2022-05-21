import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class GraficasService {

  url: string = 'http://localhost:3000/grafica'
  
  constructor(private http: HttpClient) { }

  mostarInformacion() {
      return this.http.get(this.url);
  }

  getDoughnutData() {
    return this.mostarInformacion().pipe( 
      map( (data) => {
        const labels = Object.keys(data)
        const values = Object.values(data)
        return {labels, values}
      })
    )
  }
}
