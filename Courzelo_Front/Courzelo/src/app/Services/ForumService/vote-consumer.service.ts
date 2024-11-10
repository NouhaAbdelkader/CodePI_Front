import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, catchError, throwError } from 'rxjs';
import { UserCorzeloComponent } from 'src/app/Components/user-corzelo/user-corzelo.component';
import { Answer } from 'src/app/Models/ForumEntities/Answer';
import { BadgeForumTeacher } from 'src/app/Models/ForumEntities/BadgeForumTeacher';
import { Incentives } from 'src/app/Models/ForumEntities/Incentives';
import { Vote } from 'src/app/Models/ForumEntities/Votes';
import { UserCourzelo } from 'src/app/Models/UserCorzelo/UserCourzelo';


@Injectable({
  providedIn: 'root'
})
export class VoteConsumerService {

  constructor(private http:HttpClient) { }
  private httpOptions = {
    headers: new HttpHeaders({
    
  
    }),
    withCredentials: true  // Important si vous utilisez allowCredentials: true côté Spring
  };
  AddVote(v:Vote,idAnswer: string,idUser: string){
    return  this.http.post('http://localhost:8081/ForumVote/create/'+idUser+'/'+ idAnswer,v);
  }
  //http://localhost:8081/ForumVote/update

  updateVote(v:Vote){
    return this.http.put('http://localhost:8081/ForumVote/update', v);
  }
  deleteAnswer( id:string){
    return this.http.delete('http://localhost:8081/ForumVote'+'/'+ id);
  }
//65d3902c15939e88eb26bd3b
  getVotesByUserAndAnswer(idAnswer: string,isUser: string){
    return  this.http.get<Vote>('http://localhost:8083/forum/ForumVote/Teacher/getvoteByUseAndAnswer/'+isUser+'/'+ idAnswer,this.httpOptions);
 
  }
  getVoteAnswerById(id:string){
    return  this.http.get<number>('http://localhost:8081/answers/nombreVote'+'/'+ id);

  }
   getUserById(id:string){
    return  this.http.get<UserCourzelo>('http://localhost:8081/ForumVote/getUser'+'/'+ id);

  }
  getIncentivesByTeacher(id:string):Observable<Incentives[]>{
    return  this.http.get<Incentives[]>('http://localhost:8081/ForumVote/getIncentiveesByTeacher/'+id)
    .pipe(
      catchError(error => {
        console.error('Error fetching questions:', error);
        return throwError(error);
      })
    );
  }
  //http://localhost:8081/ForumVote/getBadgeByTeacher/65d3909015939e88eb26bd3c
  getBadgesByTeacher(id:string):Observable<BadgeForumTeacher[]>{
    return  this.http.get<BadgeForumTeacher[]>('http://localhost:8081/ForumVote/getBadgeByTeacher/'+id)
    .pipe(
      catchError(error => {
        console.error('Error fetching questions:', error);
        return throwError(error);
      })
    );
  }

  AddIncentives(id:string){
    return this.http.post('http://localhost:8081/ForumVote/createPrimChat/'+id, {});
  }

  voteChanged = new Subject<void>();

  getRangeIncentiveVote(): Observable<number> {
    return this.http.get<number>('http://localhost:8081/ForumVote/insentiveVoteRange')
      .pipe(
        catchError(error => {
          console.error('Error fetching incentive vote range:', error);
          return throwError(error);
        })
      );
  }
  getRangeIncentiveExp():Observable<number>{
    return  this.http.get<number>('http://localhost:8081/ForumVote/insentiveExplanRange')
    .pipe(
      catchError(error => {
        console.error('Error fetching questions:', error);
        return throwError(error);
      })
    );
    
  }
  getRangeBadge():Observable<number>{
    return  this.http.get<number>('http://localhost:8081/ForumVote/badgeRange')
    .pipe(
      catchError(error => {
        console.error('Error fetching questions:', error);
        return throwError(error);
      })
    );
    
  }


}
