import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Heroe } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { switchMap } from 'rxjs/operators'

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: [ `
    img {
      width: 100%;
      border-radius: 8px;
    }
  `
  ]
})
export class HeroeComponent implements OnInit {

  constructor( 
    private activatedRoute: ActivatedRoute,
    private heroesService: HeroesService,
    private router: Router
  ) { }
 
    heroe!: Heroe
    
  ngOnInit(): void {
    this.activatedRoute.params
    .pipe(
      switchMap( ({ id }) => this.heroesService.getHeroesById(id) )
    )
    .subscribe(
      heroe => this.heroe = heroe
    );
  }

  // ngOnInit(): void {
  //   this.activatedRoute.params.subscribe( (heroe) => {
  //     console.log(heroe.id)
  //   })
  // }

  regresar() {
    this.router.navigate(['/heroes/listado']);
  }

}
