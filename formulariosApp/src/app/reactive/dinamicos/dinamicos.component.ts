import { Component} from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dinamicos',
  templateUrl: './dinamicos.component.html',
  styleUrls: ['./dinamicos.component.scss'],
})
export class DinamicosComponent {
  a: any;

  miFormulario: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(5)]],
    favoritos: this.fb.array(
      [
        ['Dark Souls', Validators.required], //COLECIONES DE FORMS CONTROL
        ['Sekiro', Validators.required],
      ],
      Validators.required
    ),
  });

  nuevoFavorito: FormControl = this.fb.control('', Validators.required);

  get favoritosArray() {
    return this.miFormulario.get('favoritos') as FormArray;
  }

  constructor(private fb: FormBuilder) {}

  campoNoValido(campo: string) {
    return (
      this.miFormulario.controls[campo].errors &&
      this.miFormulario.controls[campo].touched
    );
  }

  agregarFavorito() {
    if (this.nuevoFavorito.invalid) {
      return;
    }
    // this.favoritosArray.push( new FormControl(this.nuevoFavorito.value, Validators.required ));

    this.favoritosArray.push(
      this.fb.control(this.nuevoFavorito.value, Validators.required)
    );
    this.nuevoFavorito.reset();
  }

  borrar(i: number) {
    this.favoritosArray.removeAt(i);
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
