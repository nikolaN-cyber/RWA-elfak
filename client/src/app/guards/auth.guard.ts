import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "../services/auth.service";
import { map } from "rxjs";
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from "@angular/router";

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router){}

    canActivate(): Observable<boolean> {
        return this.authService.getCurrentUser().pipe(
          map(user => {
            if (user) {
              return true;
            } else {
              this.router.navigate(['/login']);
              return false;
            }
          })
        );
    }
}