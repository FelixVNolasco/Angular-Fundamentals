
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})

export class LoginComponent {

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  login() {

    this.authService.login()
                    .subscribe( (resp) => {
                      console.log(resp);
                      (resp.id) 
                      ? this.router.navigate(['/heroes']) 
                      : console.log('No se ha encontrado el usuario!')
                    });
                      
  }  

  loginSinUsuario(){
    this.authService.logout();
    this.router.navigate(['./heroes']);
  }
}
