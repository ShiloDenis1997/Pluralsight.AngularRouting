import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {
    ActivatedRouteSnapshot, RouterStateSnapshot,
    CanActivate, Router
} from '@angular/router';

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {

    constructor(private router: Router,
        private authService: AuthService) { }

    canActivate(route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        return this.checkLoggedIn(state.url);
    }

    private checkLoggedIn(url: string): boolean {
        if (this.authService.isLoggedIn()) {
            return true;
        } else {
            this.authService.redirectUrl = url;
            this.router.navigate(['/users/login']);
            return false;
        }
    }

}