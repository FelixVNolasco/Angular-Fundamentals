import { Component } from '@angular/core';
import { Calificacion, Genero, Reseña } from '../../interfaces/ventas.interfaces';

@Component({
  selector: 'app-ordenar',
  templateUrl: './ordenar.component.html',
  styles: [
  ]
})
export class OrdenarComponent  {
  
  enMayusculas: boolean = true;
  order: string = 'undefined';

  resenas: Reseña[] = [
    {
      grupo: 'Radiohead',
      album: 'In Rainbows', 
      genero: Genero.Rock,
      calificacion: Calificacion.Masterpiece
    },

    {
      grupo: 'The Microphones',
      album: 'The Glow Pt.2',
      genero: Genero.Rock,
      calificacion: Calificacion['Muy Bueno']
    },
    {
      grupo: 'Kanye West',
      album: 'Donda',
      genero: Genero.Rap,
      calificacion: Calificacion.Bueno
    }
  ]
    cambiarMayusculas() {
    return (this.enMayusculas) ? this.enMayusculas = false : this.enMayusculas = true;    
  }

  cambiarOrder(orden: string){
    this.order = orden;
    console.log(orden);
  }

}
