import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  login(user: User) : Observable<any> { // Retorna respuesta
    const urlEndpoint = 'http://localhost:8080/oauth/token';
    const credentials = btoa('angularapp'+':'+'123456');
    const httpHeaders = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + credentials});
    let params = new URLSearchParams();
    params.set('grant_type','password'); 
    params.set('username', user.username); 
    params.set('password', user.password); 

    return this.httpClient.post<any>(urlEndpoint, params, {headers: httpHeaders});
  }
}
