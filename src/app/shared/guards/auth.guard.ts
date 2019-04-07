import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService,
              private router: Router) {
    
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if(this.authService.isAuthenticated()) {
        if(this.isTokenExpired()) { // Comprueba si el token expiró o no
          this.authService.logout();
          this.router.navigate(['/login']);
          return false;
        }
        return true;
      }
      this.router.navigate(['/login']);
      return false;
    }
    
  isTokenExpired(): boolean {
    let token = this.authService.token;
    let payload = this.authService.getPayloadToken(token);
    let now = new Date().getTime() / 1000; // Convirtiendo de milisegundos a segundos

    return payload.exp < now ? true : false;
  }
  
}
