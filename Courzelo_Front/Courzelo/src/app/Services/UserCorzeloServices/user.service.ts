import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { UserCourzelo } from 'src/app/Models/UserCorzelo/UserCourzelo';


const API_URL = 'http://localhost:8083/api/auth/';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  getPublicContent(): Observable<any> {
    return this.http.get(API_URL + 'all', { responseType: 'text' });
  }

  getUserBoard(): Observable<any> {
    return this.http.get(API_URL + 'user', { responseType: 'text' });
  }

  getModeratorBoard(): Observable<any> {
    return this.http.get(API_URL + 'mod', { responseType: 'text' });
  }
  getAdminBoard(): Observable<any> {
    return this.http.get(API_URL + 'admin', { responseType: 'text' });
  }
  /********************** user ************************** */
  getUserByEmail(email: string) {
    return this.http.get<UserCourzelo>(API_URL+'getbymail' + '/' + email);
  }


  storeTokenData() {
    // Récupère le token depuis sessionStorage
    const accessToken = sessionStorage.getItem('acess-token');

    if (accessToken) {
      try {
        // Décoder le token JWT
        const decodedToken: any = jwtDecode(accessToken);

        // Stocker les données dans localStorage
        localStorage.setItem('username', decodedToken.preferred_username || '');
        localStorage.setItem('email', decodedToken.email || '');
        localStorage.setItem('given_name', decodedToken.given_name || '');
        localStorage.setItem('family_name', decodedToken.family_name || '');

        // Récupérer et stocker le rôle de realm_access
        if (decodedToken.realm_access && decodedToken.realm_access.roles) {
          const roles = decodedToken.realm_access.roles;
          localStorage.setItem('roles', JSON.stringify(roles));
        }

        console.log('Token décodé et données stockées avec succès');
      } catch (error) {
        console.error('Erreur lors du décodage du token:', error);
      }
    } else {
      console.warn("Aucun token trouvé dans 'sessionStorage'");
    }
  }

}

