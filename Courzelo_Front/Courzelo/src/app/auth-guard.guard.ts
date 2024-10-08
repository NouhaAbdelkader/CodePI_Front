import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from './Services/UserCorzeloServices/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  /*canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
    const isLoggedIn = this.authService.isAuthenticated();
    console.log('Is user authenticated?', isLoggedIn);


    if (isLoggedIn) {
      return true;
    } else {
      // Redirect to login page if not authenticated
      return this.router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url } });
    }
  }*/
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
    const isLoggedIn = this.authService.isAuthenticated();
    if (!this.authService.isLoggedIn) {
      return this.router.createUrlTree(['login']);

    }
    return true;
    console.log('Is user authenticated?', isLoggedIn);

  }

}


  /*constructor(
    private userService: UserService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {


      const roles = ['Admin','Student']

    // Get user roles from UserService
    const userRoles = roles;
      console.error("Role : "+userRoles)
    // Get required roles from route data
    const requiredRoles = route.data["roles"] as string[];

    console.log("rre",requiredRoles )
    // Check if user has any roles
    if (!userRoles || userRoles.length === 0) {
      // Redirect to login page and preserve the attempted URL
      return this.router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url } });
    }

    // Check if user has any of the required roles
    const hasRequiredRole = userRoles.some((role: string) => requiredRoles.includes(role));

    if (!hasRequiredRole) {
      this.showAlert('You do not have permission to access this page!');

      // Redirect to unauthorized page or login page and preserve the attempted URL
      return this.router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url } });
    }


    // User has required roles, allow access
    return true;
  }
  private showAlert(message: string) {
   console.log(message)
  }*/






