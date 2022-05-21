import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _historial: string[] = [];
  private apiKey:string = "hSGB2ji6CkyaDC3UILV7dVHBZ5pW1R25";
  private servicioUrl:string = "https://api.giphy.com/v1/gifs";
  /* Para poder mapear y acceder a las propiedades de nuestros gifs, es necesario importar la interfaz de nuestro Gifs,
  la interfaz que nos interesa es Gif */
  public resultados : Gif[] = []; 

  /* Se realiza el metodo get para poder obtener el historia desde otros componentes, cabe aclarar que se debe de realizar
  un nuevo array, esto se puede realizar utilizando el spread operator, de la siguiente forma [...this.array], este metodo se 
  debe de realizar debido a que la propiedad esta declarado de manera privada
  */
  get historial(){
    return [...this._historial];
  }

  /* Para poder hacer uso de los metodos HTTP a la API, debemos de instanciar una objeto con la clase de HttpClient
  importada de la libreria de @angular/common/http */  
  constructor(private http: HttpClient){
    //Segunda opción de validación
    // if(localStorage.getItem("historial")){
    //   this._historial = JSON.parse(localStorage.getItem("historial")!);
    // }
    // Se guarda el historial en el LocalStorage
    this._historial = JSON.parse(localStorage.getItem("historial")!) || [];
    // Se guarda los resultados para poder mostrar la ultima busqueda por default
    this.resultados = JSON.parse(localStorage.getItem("resultados")!) || [];
  }

  /*Se obtiene el termino de busqueda,se normaliza a minusculas, se muestran las ultimas 10 busquedas
    y se agrega el termino al array de historial, tambien se realiza la validación para que no realice 
    dos busquedas con un termino igual
  */
  buscarGifs(query:string){
    query = query.trim().toLocaleLowerCase();
    if(!this._historial.includes(query)){
      this._historial.unshift(query);
      this._historial = this._historial.splice(0,10);
      localStorage.setItem("historial", JSON.stringify(this._historial));
    }
    // console.log(this._historial);

    /* Se importan los componentes de HttpParams y Http Cliente de la libreria @angular/common/http 
     - Se definen los parametros de nuestra petición a la API
    */
    const params = new HttpParams()
    .set("api_key", this.apiKey)
    .set("q", query)
    .set("limit", "10");
    /* 
    - Gracias a que importamos nuestros componentes de la libreria anteriormente mencionada, disponemos de los 
    verbos Http para hacer peticiones con mejor mantenimiento a diferencia de los demás, ya que nos devuelve un observer
    con propiedades que nos permite tener mejor manipulación de nuestra petición.
    - El unico incoveniente es que nuestro metodo GET es genérico, por lo tanto debemos de hacer una interfaz para mapear 
    todas las posibles respuestas de nuestra peticion a la API, para hacer esto debemos de ingresar a la pagina :
    https://app.quicktype.io/, hacer cualquier peticion de tipo GET en nuestro Postman, copiar en el clipboard y ingresarlo 
    a la pagina mencionada, cabe aclarar que se debe espicificar que estamos trabajando en Typescript,
    las interfaces que nos interesan son <Sea
    */
    this.http.get<SearchGifsResponse>(`${this.servicioUrl}/search`, {params: params})
    .subscribe((resp) => {
      // console.log(resp.data);
      this.resultados = resp.data;            
      localStorage.setItem("resultados", JSON.stringify(this.resultados))
    })

  }
  
}
