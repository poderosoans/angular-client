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
  }

  login(): void {
    console.log(this.user);
    if(this.user.username == null || this.user.password == null) {
      Swal.fire('Error Login', 'Nombre de usuario o password vacío', 'error');
      return;
    }

    this.authService.login(this.user).subscribe( response => {
      console.log(response);
      let payload = JSON.parse(atob(response.access_token.split(".")[1]));
      console.log(payload);

      this.router.navigate(['/clientes']);
      Swal.fire('Login', `Hola ${payload.user_name} has iniciado sesión con éxito.`,'success');
    });

  }

}
