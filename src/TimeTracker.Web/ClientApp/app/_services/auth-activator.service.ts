import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { OidcSecurityService } from "angular-auth-oidc-client";

@Injectable()
export class AuthActivatorService implements CanActivate {

    constructor(private authService: OidcSecurityService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let canPass = false;
        
        if (this.authService.getIdToken() === '') {
            this.authService.authorize();
        }
        else {
            canPass = true;
        }

        return canPass;
    }
}