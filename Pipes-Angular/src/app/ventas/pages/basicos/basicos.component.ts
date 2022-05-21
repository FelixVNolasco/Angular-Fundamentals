import { Component } from '@angular/core';

@Component({
  selector: 'app-basicos',
  templateUrl: './basicos.component.html',
  styles: [
  ]
})
export class BasicosComponent {
 
  nombreLower: string = "felix";
  nombreUpper: string = "FELIX";
  nombreCompleto: string = "FeLiX VeGa";

  fecha: Date = new Date();
  
}
