import { Component } from '@angular/core';
import { Evaluation } from 'src/app/Models/EvaluationEntities/Evaluation';
import { UserCourzelo, badgeType } from 'src/app/Models/UserCorzelo/UserCourzelo';
import { EvaluationService } from 'src/app/Services/EvaluationServices/evalServices/evaluation.service';

@Component({
  selector: 'app-rewards',
  templateUrl: './rewards.component.html',
  styleUrls: ['./rewards.component.css']
})
export class RewardsComponent {
  evaluations! : Evaluation[] 
  userData!: UserCourzelo;
   silverBadge !: number;
   dimondBadge !: number;
   bronzeBadge !: number;
   goldBadge !: number;
   idUser!: string;
   roles: string[] = [];
   username!:string
  constructor(private evaluationService: EvaluationService ) { }

  ngOnInit() {
    let user = sessionStorage.getItem('auth-user');
    console.log('User from sessionStorage:', user);
    if (user) {
      let userData = JSON.parse(user);
      console.log('Parsed user data:', userData);
      this.idUser = userData.id;
      this.username = userData.username;
      this.roles = userData.roles;
      console.log('Roles:', this.roles);
    }
    this.StudentRewards();
  }

  StudentRewards() {
   
        this.evaluationService.getStudentById(  this.idUser).subscribe(
          (data: UserCourzelo) => {
            this.userData = data;
            console.log('user data:', this.userData);

            this.evaluationService.getStudentSilverBadges(this.userData.id).subscribe(
              (data: number) => {
                this.silverBadge = data;
    
                console.log('user data:', this.silverBadge);
              },
              (error) => {
                console.error('Error fetching user data: ', error);
                console.error('Error details:', error.error);
              }
            );




            this.evaluationService.getStudentbronzeBadges(this.userData.id).subscribe(
              (data: number) => {
                this.bronzeBadge = data;
    
                console.log('user data:', this.silverBadge);
              },
              (error) => {
                console.error('Error fetching user data: ', error);
                console.error('Error details:', error.error);
              }
            );






            this.evaluationService.getStudentDimondBadges(this.userData.id).subscribe(
              (data: number) => {
                this.dimondBadge = data;
    
                console.log('user data:', this.silverBadge);
              },
              (error) => {
                console.error('Error fetching user data: ', error);
                console.error('Error details:', error.error);
              }
            );




            this.evaluationService.getStudentgoldBadges(this.userData.id).subscribe(
              (data: number) => {
                this.goldBadge = data;
    
                console.log('user data:', this.silverBadge);
              },
              (error) => {
                console.error('Error fetching user data: ', error);
                console.error('Error details:', error.error);
              }
            );



          },
          (error) => {
            console.error('Error fetching user data: ', error);
            console.error('Error details:', error.error);
          }
        );
        
     
       

  }
}


