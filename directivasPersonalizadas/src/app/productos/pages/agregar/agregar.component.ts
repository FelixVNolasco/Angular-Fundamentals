import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [
  ]
})
export class AgregarComponent {

  color: string = "red";
  nombre: string = '0.00';

  miFormulario: FormGroup = this.fb.group({
    nombre: ['', Validators.required]
  })

  constructor( private fb: FormBuilder) { }

  campoError(campo: string): boolean {
    return this.miFormulario.get('nombre')?.invalid || false;
  }

  cambiarColor() {
    const color = "#xxxxxx".replace(/x/g, y=>(Math.random()*16|0).toString(16));
    this.color = color;
  }

  cambiarNumero() {
    this.nombre = Math.random().toString();
  }
}
