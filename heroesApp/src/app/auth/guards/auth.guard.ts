
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot, UrlSegment, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad, CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ){}

  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

      return this.authService.verifyAuth()
      .pipe(
        tap( (userAuth: boolean) => {
          if(!userAuth) {
            this.router.navigate(['./auth/login'])
          } 
        })
      )
      
    //   if (this.authService.auth.id) {
    //     return true;
    //   }

    // console.log('BLOQUEADO POR AUTH GUARD! - canActivate');
    // return false;
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | boolean {

      return this.authService.verifyAuth()
      .pipe(
        tap( (userAuth: boolean) => {
          if(!userAuth) {
            this.router.navigate(['./auth/login'])
          } 
        })
      )
    }
  
    //   if (this.authService.auth.id) {
    //     return true;
    //   }

    //   // console.log('CANLOAD', true);
    //   // console.log('RUTA:', route);
    //   // console.log('SEGMENTOS:', segments);
    // console.log('BLOQUEADO POR AUTH GUARD! - canLoad');
    // return false;
  
    
}
