import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Services/UserCorzeloServices/auth.service';
import { TokenStorageService } from '../Services/UserCorzeloServices/token-storage.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {
    username: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  roles2:any ={} ;

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService, private router : Router ) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;


    } 

  }

  onSubmit(): void {
    const { username, password } = this.form;

    this.authService.login(username, password).subscribe({
      next: data => {
       // console.log('Data:', data); // Log the data object

        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);

        console.log("**aaaaa**********" , data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
       
        if(this.roles.includes('Admin')){
          this.router.navigate(['/admin']);

         }else{
          this.router.navigate(['/HomePage']);
         }
        console.log("********* the roleeee", this.roles)
            },
      error: err => {
        console.log('Error:', err); // Log any errors

        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    });
  }

  reloadPage(): void {
    window.location.reload();
  }

}
