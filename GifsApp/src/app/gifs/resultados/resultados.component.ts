import { Component} from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styles: [
  ]
})
export class ResultadosComponent {

  /*El unico objetivo de nuestro componente es poder utilizar el get que esta establecido en nuestro servicio, 
  ya que nos devolverá un array de resultados, en base al termino de busqueda que se le haya enviado, cabe aclarar que 
  debemos de instanciar nuestro servicio en el constructor del componente para hacer uso del metodo get*/
  get resultados() {
    return this.gifsService.resultados;
  }
  
  constructor( private gifsService: GifsService) { }

}
