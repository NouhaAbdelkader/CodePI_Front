import { Component, OnInit } from '@angular/core';
import { UserService } from '../Services/UserCorzeloServices/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  content?: string;
  contentt!: string;
  user: any = {};
 username!:string;
 roles:any ={} ;
  

  constructor(private userService: UserService) { }
  ngOnInit(): void {
    this.userService.getPublicContent().subscribe({
      next: data => {
        this.content = data;
      },
      error: err => {
        this.content = JSON.parse(err.error).message;
      }
    });
    
    let user = sessionStorage.getItem('auth-user');
    if (user) {
      let userData = JSON.parse(user);
      let userId = userData.id;
      this.username = userData.username;
      this.roles = userData.roles;
      //console.log("dataaaaaaaaaa********", userId, this.username, this.roles);
    }
    //console.log("dataaaaaaaaaa********",  this.username);
  }
  
  getUserData() {
    if(this.roles.includes('Teacher')){  
      console.log("dataaaaaaaaaa********",  this.username, this.roles);
    }else{  console.log("noooooooooooooooooooooooooo");}
  
  }
}
