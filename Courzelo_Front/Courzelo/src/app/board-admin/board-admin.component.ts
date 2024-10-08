import { Component, OnInit } from '@angular/core';
import { UserService } from '../Services/UserCorzeloServices/user.service';
import { TokenStorageService } from '../Services/UserCorzeloServices/token-storage.service';
import { Router } from '@angular/router';
import { VoteConsumerService } from '../Services/ForumService/vote-consumer.service';
import { Chart } from 'angular-highcharts';
@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.css']
})
export class BoardAdminComponent implements OnInit {
  content?: string;
  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;
  lineChart!: Chart;
  rangeVote!:number
  rangeExp!:number;
  rangeBadge!:number;



  constructor(private voteService:VoteConsumerService,private userService: UserService,private tokenStorageService: TokenStorageService,private router:Router) { }

  ngOnInit(): void {
    this.userService.getAdminBoard().subscribe({
      next: data => {
        this.content = data;
      },
      error: err => {
        this.content = JSON.parse(err.error).message;
      }
    });
      ///For session 
      this.isLoggedIn = !!this.tokenStorageService.getToken();

      if (this.isLoggedIn) {
        const user = this.tokenStorageService.getUser();
        this.roles = user.roles;
  
        this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
        this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');
  
        this.username = user.username;
      }
      this.voteService.getRangeIncentiveVote().subscribe(
        (data) => {
          this.rangeVote = data;
          this.createChart();
        }
      );
  
      this.voteService.getRangeIncentiveExp().subscribe(
        (data) => {
          this.rangeExp = data;
          this.createChart();
        }
      );
  
      this.voteService.getRangeBadge().subscribe(
        (data) => {
          this.rangeBadge = data;
          this.createChart();
        }
      );
      
  }
  logout(): void {
    this.tokenStorageService.signOut();
    //window.location.reload();
    this.router.navigateByUrl('/login')
    
  }
  createChart(): void {
    if (this.rangeVote !== undefined && this.rangeExp !== undefined && this.rangeBadge !== undefined) {
      this.lineChart = new Chart({
        chart: {
          type: 'pie'
        },
        title: {
          text: 'Linechart'
        },
        credits: {
          enabled: false
        },
        tooltip: {
          pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        series: [
          {
            type: "pie",
            data: [
              { name: "Incetive vote ", y: this.rangeVote, color: "#00FF00" },
              { name: "Incentive Explantion", y: this.rangeExp, color: "#FF0000" },
              { name: "Badge ", y: this.rangeBadge, color: "#0000FF" },
            ]
          }
        ]
      });
    }
  }
}
