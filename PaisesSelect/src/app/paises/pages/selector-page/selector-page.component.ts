import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { switchMap, tap } from 'rxjs/operators'

import { Paises, PaisSmall } from '../../interfaces/paises.interface';
import { PaisesServiceService } from '../../services/paises-service.service';



@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
  styleUrls: ['./selector-page.component.scss'],
})
export class SelectorPageComponent implements OnInit {

  miFormulario: FormGroup = this.fb.group({
    region: ['', Validators.required],
    pais: ['', Validators.required],
    frontera: ['', Validators.required]
  });

  //llenar select

  regiones: string[] = [];
  paises: Paises[] = [];
  fronteras: string[] = [];  
  cargando: boolean = false;

  constructor(
    private fb: FormBuilder,
    private paisesService: PaisesServiceService
  ) {}

  ngOnInit(): void {
    this.regiones = this.paisesService.regiones;
    // this.miFormulario.get("region")?.valueChanges.subscribe((region) => {
    //   // console.log(region);
    //   this.paisesService.getPaisesPorRegion(region).subscribe( paises => {
    //     console.log(paises);
    //     this.paises = paises;
    //   })
    // } )

    this.miFormulario.get('region')?.valueChanges.pipe(
        tap( ( _ ) => {
          this.miFormulario.get("pais")?.reset("");
          this.cargando = true;
        }),
        switchMap((region) => this.paisesService.getPaisesPorRegion(region))
      )
      .subscribe((paises) => {
        this.paises = paises;
        this.cargando = false;
      });

    this.miFormulario.get('pais')?.valueChanges
    .pipe(
      tap( ( _ ) => {        
        this.cargando = true;
        this.fronteras = [];
        this.miFormulario.get("frontera")?.reset("");
        
      }),
      switchMap( (codigo) => this.paisesService.getPaisPorCodigo(codigo) )
    )
    .subscribe((pais) => {
      this.cargando = false;
      this.fronteras = pais?.borders || [];
      console.log(this.fronteras);
    });

  }

  enviar() {}
}
