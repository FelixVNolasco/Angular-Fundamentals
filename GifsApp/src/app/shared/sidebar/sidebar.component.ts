import { Component} from '@angular/core';
import { GifsService } from 'src/app/gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {

  constructor(private gifsService : GifsService) { }  

  /* El unico objetivo de este metodo get historial(), es poder mostrar las ultimas 10 busquedas que el usuario haya realizado
     Cabe aclarar que cada vez que el usuario realice una busqueda, esta se añadirá en el array del historial, hay una explicación más 
     profunda en el servicio */
  get historial(){
    return this.gifsService.historial;    
  }

  /* Este metodo de buscar es demasiado parecido al metodo que se encuentra en el componente de busqueda.component.ts, ya que la
  unica diferencia es que buscaremos en base a un termino previamente buscado, que se encontrará en el historial de busqueda, por 
  lo tanto el usuario podrá realizar una busqueda con uno de los terminos que haya buscado */
  buscar(termino:string){
    this.gifsService.buscarGifs(termino);
  }
}
