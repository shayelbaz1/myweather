import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { UserServiceService } from '../services/user-service/user-service.service';
import { utils } from '../services/utils.service';

@Injectable()

export class AuthGuard implements CanActivate {
    constructor(
        private userSevice: UserServiceService,
        private router: Router
    ) { }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean | Promise<boolean> | Observable<boolean> {
        return this.userSevice.loggedIn
            .pipe(
                take(1),
                map((isLoggedIn: boolean) => {
                    if (!isLoggedIn) {
                        this.router.navigate(['/login']);
                        return false;
                    }
                    return true;
                })
            )
    }
}