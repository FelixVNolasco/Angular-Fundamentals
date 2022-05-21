
import { Component } from '@angular/core';

@Component({
  selector: 'app-no-comunes',
  templateUrl: './no-comunes.component.html',
  styles: [
  ]
})
export class NoComunesComponent {

  nombre: string = "Sofia";
  genero: string = "femenino";

  generosMap = {
    'masculino': 'invitarlo',
    'femenino': 'invitarla'
  };

  clientes : string[] = ["Juan", "Maria", "Pedro", "Carlos", "Sofia"];
  clientesMap = {
    '=0': 'no tenemos ningun cliente esperando',
    '=1': 'tenemos un cliente esperando',
    'other': 'tenemos # clientes esperando'
  };

  cambiarPersona() {
    if(this.genero == "femenino"){
      this.genero = "masculino";
      this.nombre = "Felix";
    } else {
      this.genero = "femenino";
      this.nombre = "Sofia";
    }
  }

  eliminarPersona(){
    this.clientes.pop();
  }


  persona = {
    nombre: "Felix",
    edad: "21",
    sexo: "masculino",
    carrera: "Ingeniería en Informática"
  }

  promesa = new Promise((resolve, reject) => {
    setTimeout(() => {
       resolve("Se ha obtenido la Data del promise");
    }, 3000);
  });
  
}

