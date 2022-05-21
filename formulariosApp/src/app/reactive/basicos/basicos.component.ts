import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-basicos',
  templateUrl: './basicos.component.html',
  styleUrls: ['./basicos.component.scss']
})
export class BasicosComponent implements OnInit{
 

  
  // miFormulario = new FormGroup({
  //   'nombre'     : new FormControl('Teclado Casio'),
  //   'precio'     : new FormControl('1800'),
  //   'existencias': new FormControl('5'),
  // })


  miFormulario: FormGroup = this.fb.group({
    nombre: [' ', [ Validators.required, Validators.minLength(3) ]],
    precio: [0, [ Validators.required, Validators.min(0) ]],
    existencias: [0, [ Validators.required, Validators.min(0) ]],
  })

  constructor( private fb: FormBuilder) { }


  ngOnInit(){
    this.miFormulario.reset({
      nombre: 'Teclado Random',
      precio: 1000
    })
  }

  campoNoValido(campo: string){
    return this.miFormulario.controls[campo].errors && this.miFormulario.controls[campo].touched
  }

  guardar() {
    if (this.miFormulario.invalid) {
      this.miFormulario.markAllAsTouched();
      return;
    }
    console.log(this.miFormulario.value);
    this.miFormulario.reset();
  }
}
