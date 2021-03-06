import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { switchMap } from 'rxjs/operators'
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [
    `
    img{
      width: 50%;
      border-radius: 8px;
    }
    `
  ]
})
export class AgregarComponent implements OnInit {

  publishers = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics'
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics'
    }
  ];

  heroe: Heroe = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    alt_img: ''
  }

  constructor(
    private heroeService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private _snackBar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {

    // this.activatedRoute.params.subscribe( ({id}) => console.log(id) )

    if(!this.router.url.includes('editar')) {
      return;
    }

    this.activatedRoute.params.pipe(
      switchMap( ({id}) => this.heroeService.getHeroesById(id))
    )
    .subscribe( (heroe) => this.heroe = heroe)
    
  }

  guardar() {

    if(this.heroe.superhero.trim().length === 0){
      return;
    }

    if(this.heroe.id) {
      //actualizar
      this.heroeService.actualizarHeroe( this.heroe ).subscribe( heroe => this.mostrarSnack('Registro Actualizado!'))
    } else {
      //crear          
      this.heroeService.agregarHeroe(this.heroe)
      .subscribe( heroe => {
        this.router.navigate(['/heroes/editar', heroe.id])
        this.mostrarSnack('Se ha creado el registro');
      })
    }
      
  }

  borrar() {


    const dialog = this.dialog.open( ConfirmarComponent, {
      width: '250px',
      data: this.heroe
    } )

    dialog.afterClosed().subscribe( resp => {
      if(resp === true) {
      this.heroeService.borrarHeroe(this.heroe.id!) 
                       .subscribe ( resp => {
      this.router.navigate(['/heroes']);
      this.mostrarSnack('Se ha borrado el registro');
    });
      }
    })
    
  }


  mostrarSnack( mensaje: string): void {
    this._snackBar.open( mensaje, 'OK ????', {
      duration: 3000
    })
  }
}
