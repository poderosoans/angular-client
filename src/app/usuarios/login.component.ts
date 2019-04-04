import { Component, OnInit } from '@angular/core';
import { User } from '../shared/model/user';
import Swal from 'sweetalert2';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  title: String = 'Iniciar Sesión';
  user: User;

  constructor(private authService: AuthService,
              private router: Router) {
    this.user = new User();
   }

  ngOnInit() {
    if(this.authService.isAuthenticated()) {
      Swal.fire('Login', `Hola ${this.authService.user.username} ya estás autenticado`, 'info');
      this.router.navigate(['/clientes']);
    }

  }

  login(): void {
    console.log(this.user);
    if(this.user.username == null || this.user.password == null) {
      Swal.fire('Error Login', 'Nombre de usuario o password vacío', 'error');
      return;
    }

    this.authService.login(this.user).subscribe( response => {
      console.log(response);

      // Guardamos token y usuario
      this.authService.saveUser(response.access_token);
      this.authService.saveToken(response.access_token);

      let user = this.authService.user;

      this.router.navigate(['/clientes']);
      Swal.fire('Login', `Hola ${user.username} has iniciado sesión con éxito.`,'success');
    }, err => {
      if(err.status == 400) {
        Swal.fire('Error Login', 'Usuario o contraseña incorrecta', 'error');
      }

    });

  }

}
