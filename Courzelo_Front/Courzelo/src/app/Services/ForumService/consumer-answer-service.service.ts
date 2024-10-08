import { Injectable } from '@angular/core';
import { Answer } from 'src/app/Models/ForumEntities/Answer';
import { catchError } from 'rxjs/operators';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConsumerAnswerServiceService {

  constructor(private http:HttpClient) { }

  getAnswerByQuestion(id: string):Observable<Answer[]>{
    return  this.http.get<Answer[]>('http://localhost:8081/answers/getAnswersByQuestion'+'/'+ id)
    .pipe(
      catchError(error => {
        console.error('Error fetching questions:', error);
        return throwError(error);
      })
    );
  }
  AddAnswer(a:Answer ,idQuestion: string, idUser: string){
    return  this.http.post('http://localhost:8081/answers/create/'+idUser+'/'+ idQuestion,a);
  }
  deleteAnswer( id:string){
    return this.http.delete('http://localhost:8081/answers'+'/'+ id);
  }
  getAnswerById(id:string){
    return  this.http.get<Answer>('http://localhost:8081/answers'+'/'+ id);

  }
  //http://localhost:8081/answers/getOderByVote
  getAnswerByQuestionOrderByVote(id: string):Observable<Answer[]>{
    return  this.http.get<Answer[]>('http://localhost:8081/answers/getOderByVote'+'/'+ id)
    .pipe(
      catchError(error => {
        console.error('Error fetching questions:', error);
        return throwError(error);
      })
    );
  }


 
  
}
