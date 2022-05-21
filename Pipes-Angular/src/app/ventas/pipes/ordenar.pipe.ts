import { Pipe, PipeTransform } from '@angular/core';
import { Reseña } from '../interfaces/ventas.interfaces';

@Pipe({
  name: 'ordenar'
})
export class OrdenarPipe implements PipeTransform {

  transform(reseña: Reseña[], order: string = 'undefined'): Reseña[] {

    switch (order) {
     
      case 'nombre':
        reseña = reseña.sort((a,b) => (a.grupo > b.grupo) ? 1 : -1 );
        return reseña;      
      case 'album':
        reseña = reseña.sort((a,b) => (a.album > b.album) ? 1 : -1 );
        return reseña;             
      case 'genero':
        reseña = reseña.sort((a,b) => (a.genero > b.genero) ? 1 : -1 );
        return reseña;
      case 'calificacion':
        reseña = reseña.sort((a,b) => (a.calificacion > b.calificacion) ? 1 : -1 );
        return reseña;
      default:
        return reseña;
    }

  }

}
