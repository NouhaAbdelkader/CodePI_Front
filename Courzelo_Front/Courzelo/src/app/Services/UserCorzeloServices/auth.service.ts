import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';
import { Router } from '@angular/router';
import { ERole } from 'src/app/Models/UserCorzelo/UserCourzelo';

const AUTH_API = 'http://localhost:8081/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'

})
export class AuthService {
  redirectUrl!: string;
  isLoggedIn = false;
  constructor(private http: HttpClient,private router: Router) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${AUTH_API}signin`, { username, password }, httpOptions)
      .pipe(
        tap((response: any) => {
          // Assuming the response contains data indicating successful login
          if (response && response.accessToken) {
            this.isLoggedIn = true; // Update isLoggedIn on successful login
          }
        })
      );
  }

  register(username: string, email: string, password: string , roles : ERole ): Observable<any> {

    return this.http.post(`${AUTH_API}signup`, { username, email, password , roles }, httpOptions);
  }

  // New method to check if the user is authenticated
  isAuthenticated(): boolean {
    //this.redirectUrl = this.router.url;
    return this.isLoggedIn;
  }
}
