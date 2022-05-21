import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

interface Persona {
  nombre: string;
  favoritos: Favoritos[];
}

interface Favoritos {
  id: number;
  nombre: string;
}

@Component({
  selector: 'app-dinamicos',
  templateUrl: './dinamicos.component.html',
  styles: [
  ]
})
export class DinamicosComponent  {


  @ViewChild('miFormulario') miFormulario!: NgForm;

  
  nuevoJuego: string = "";

  persona: Persona = {
    nombre: 'Felix',
    favoritos: [
      {
      id:1,
      nombre:'Dark Souls'
      },
      {
      id:2,
      nombre:'Ghost of Tushima'
      }
    ]
  }

  validacionNombre(): boolean {
    return this.miFormulario?.controls.persona?.invalid
    && this.miFormulario?.controls.persona?.touched; 
  }

  agregar(){

    if(this.nuevoJuego === ""){
      console.log('Debe de tener al menos un caracter');
      return
    }

    const nuevoFavorito: Favoritos = {
      id: this.persona.favoritos.length + 1,
      nombre: this.nuevoJuego
    }

    this.persona.favoritos.push({...nuevoFavorito});
    this.nuevoJuego = "";
  }

  eliminar(index: number) {
    this.persona.favoritos.splice(index, 1);
  }

  guardar(){
    console.log('Se ha hecho el post correctamente');
  }

}
