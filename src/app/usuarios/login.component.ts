import { Component, OnInit } from '@angular/core';
import { User } from '../shared/model/user';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  title: String = 'Iniciar Sesión';
  user: User;

  constructor() {
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
  }

}
