import { Component, OnInit } from '@angular/core';
import { UserService } from '../Services/UserCorzeloServices/user.service';

@Component({
  selector: 'app-board-user',
  templateUrl: './board-user.component.html',
  styleUrls: ['./board-user.component.css']
})
export class BoardUserComponent implements OnInit {
  users: any[] = []; // Définissez le tableau des utilisateurs

  constructor(private userService: UserService) { }

  ngOnInit(): void {
   // this.userService.getAllUsers().subscribe({
     /* next: (data: any[]) => {
        this.users = data; // Stockez la liste des utilisateurs dans la propriété users
      },
      error: err => {
        console.error('Error:', err);
      }
    }); */
  }
}
