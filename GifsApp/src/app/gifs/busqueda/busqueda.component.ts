import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent  {

  /* Con esta metodo de buscar, el objetivo es obtener el valor de nuestra caja de texto para asi
     mandarlo a nuestro servicio, en donde la función que corresponde a nuestro servicio se llama buscarGifs(),
     para obtener el valor  de una caja de texto existen varias formas, pero angular nos proporciona el decorador de 
     propiedades @ViewChild, que es muy similiar a hacer un document.querySelector(#id), por ejemplo, la gran ventaja del decorador, 
     a diferencia de Js Vanilla, es que podemos localizar el objeto y escuchar por un evento al mismo tiempo, en este caso estamos 
     escuchando por el evento de <HTMLInputElemen>, en donde cada vez que nosotros hagamos enter en nuestro teclado, se obtendrá el valor 
     de nuestra caja de texto o Input. Cabe aclarar que para pasar el valor de nuestra caja de texto a nuestra función buscarGifs(), debemos 
     de tener una instancia de nuestro servicio en el constructor.
  */
  @ViewChild('txtBuscar') txtBuscar!:ElementRef<HTMLInputElement>
  constructor(private gifsService : GifsService){}

  /* Lo que se realiza en este metodo de buscar, es obtener el valor del Input, hacer la validacion para que no enviemos 
  terminos de busqueda vacios, por lo tanto, si detecta una longitud igual a 0 de nuestro Input, se saldrá del metodo y no realiza
  ninguna busqueda, después se pasa el termino de busqueda a la función que realizará la busqueda en sí, ubicada en el servicio,
  por ultimo se reseteara el Input o caja de texto */
  buscar(){    
    const valor = this.txtBuscar.nativeElement.value;
    if(valor.trim().length === 0) {return}
    this.gifsService.buscarGifs(valor);
    this.txtBuscar.nativeElement.value="";    
  }
}
