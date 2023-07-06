import { AuthService } from "../services/auth.service";
import { inject } from "@angular/core";
import { Router } from "@angular/router";

export const authGuard = () => {
    const authService = inject(AuthService)   
    const router = inject(Router);

    if (authService.loggedIn()) {
        console.log('AuthGuard: Logged in')
        return true;
    }
    return router.parseUrl('/login');
}