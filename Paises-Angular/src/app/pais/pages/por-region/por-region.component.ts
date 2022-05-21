import { Component} from '@angular/core';
import { PaisService } from '../../services/pais.service';
import { Country } from '../../interfaces/pais-interface';
@Component({
  selector: 'app-por-region',
  templateUrl: './por-region.component.html',
  styles: [
  ]
})
export class PorRegionComponent{

  regiones: string[] = ["africa", "americas", "asia", "europe", "oceania"];
  regionActiva: string = "";
  paises: Country[] = [];

  constructor(private paisService: PaisService) { }

  getClaseCSS(region:string):string{
    return (region === this.regionActiva) ? 'btn btn-dark ms-2'  : 'btn btn-outline-dark ms-2'
  }

  activarRegion(region:string){

    if(region === this.regionActiva) {return}

    this.regionActiva = region;
    this.paises = [];
    // console.log(this.regionActiva); 
    //HACER LLAMADO AL SERVICIO
    this.paisService.buscarRegion(region).subscribe((paises) => this.paises = paises)
    
  }

}
