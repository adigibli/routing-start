import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs/observable';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(private authService: AuthService,
              private route: Router) { }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): boolean | Observable<boolean> |  Promise<boolean > {
    return this.authService.isAuthenticated()
      .then(
        (authenticated: Boolean) => {
          if(authenticated) {
            return true;
          } else {
              this.route.navigate(['/']);
            }
          }
        );
  }

  canActivateChild(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | Observable<boolean> |  Promise<boolean > {
      return this.canActivate(route, state);
    }
}
