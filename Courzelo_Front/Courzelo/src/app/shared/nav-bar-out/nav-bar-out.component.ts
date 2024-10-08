import { Component } from '@angular/core';
import { TokenStorageService } from 'src/app/Services/UserCorzeloServices/token-storage.service';

@Component({
  selector: 'app-nav-bar-out',
  templateUrl: './nav-bar-out.component.html',
  styleUrls: ['./nav-bar-out.component.css']
})
export class NavBarOUTComponent {
  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;

  constructor(private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');

      this.username = user.username;
    }
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
  

}
