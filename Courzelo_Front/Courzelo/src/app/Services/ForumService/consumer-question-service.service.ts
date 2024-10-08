

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { catchError } from 'rxjs/operators';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { Module } from 'src/app/Models/AcademicProgramEntities/Module';
import { QuestionForum } from 'src/app/Models/ForumEntities/QuestionForum';
import { UserCourzelo } from 'src/app/Models/UserCorzelo/UserCourzelo';
import { RateQuestion } from 'src/app/Models/ForumEntities/RateQuestion';



@Injectable({
  providedIn: 'root'
})
export class ConsumerQuestionServiceService {
  username!:string;
  roles:any ={} ;
  id!:string;

  constructor(private http: HttpClient) { 
    let user = sessionStorage.getItem('auth-user');
    if (user) {
      let userData = JSON.parse(user);
      this.id = userData.id;
      this.username = userData.username;
      this.roles = userData.roles;
    }
  }

  private readonly baseUrl = 'https://www.purgomalum.com/service';

  getAllQuestion():Observable<QuestionForum[]>{
    return  this.http.get<QuestionForum[]>('http://localhost:8081/questions/all')
    .pipe(
      catchError(error => {
        console.error('Error fetching questions:', error);
        return throwError(error);
      })
    );
  }
  getAllModules():Observable<Module[]>{
    return  this.http.get<Module[]>('http://localhost:8081/answers/getALLModule/all')
    .pipe(
      catchError(error => {
        console.error('Error fetching questions:', error);
        return throwError(error);
      })
    );
  }
  getModuleId(name: string) {
    return this.http.get<Module>('http://localhost:8081/answers/getModuleByName' + '/' + name);
  }
  AddQuestion(id: string ,question: QuestionForum,idModule: string){
    console.log("le id **********************",this.id)
    return  this.http.post('http://localhost:8081/questions/create/'+id+'/'+ idModule,question);
  }
  getQuestionById(id: string){
    return  this.http.get<QuestionForum>('http://localhost:8081/questions'+'/'+ id);
  }
  deleteQuestion( id:string){
    return this.http.delete('http://localhost:8081/questions'+'/'+ id);
  }

  updateQuestion(p:QuestionForum){
    return this.http.put('http://localhost:8081/questions/update', p);
  }
  //rating 
  AddRating(question: RateQuestion,idQuestion: string,idUser: string){
    return  this.http.post('http://localhost:8081/questions/Rating/create'+'/'+ idQuestion+'/'+idUser,question);
  }
  updateRate(p:RateQuestion){
    return this.http.put('http://localhost:8081/questions/Rate/update', p);
  }
  getRateByqIdAndUser(idq: string,iduser: string){
    return  this.http.get<RateQuestion>('http://localhost:8081/questions/Rate'+'/'+ idq +'/'+ iduser);
  }
  getRatesAverage(idq: string){
    return  this.http.get<number>('http://localhost:8081/questions/getTotalRateAverage'+'/'+ idq +'/' );
  }
  //http://localhost:8081/questions/orderByModule/

getAllQuestionByModul3e(idm:string):Observable<QuestionForum[]>{
  return  this.http.get<QuestionForum[]>('http://localhost:8081/questions/orderByModule/' + idm)
  .pipe(
    catchError(error => {
      console.error('Error fetching questions:', error);
      return throwError(error);
    })
  );
}
//
getAllQuestionRated():Observable<QuestionForum[]>{
  return  this.http.get<QuestionForum[]>('http://localhost:8081/questions/orderByRatingAverge')
  .pipe(
    catchError(error => {
      console.error('Error fetching questions:', error);
      return throwError(error);
    })
  );
}
//search
getAllQuestionByTitle(title:String):Observable<QuestionForum[]>{
  return  this.http.get<QuestionForum[]>('http://localhost:8081/questions/searchBytitle'+'/'+ title )
  .pipe(
    catchError(error => {
      console.error('Error fetching questions:', error);
      return throwError(error);
    })
  );
}

//Profanity URL 

  checkProfanity(text: string): Observable<boolean> {
    const url = `${this.baseUrl}/containsprofanity?text=${encodeURIComponent(text)}`;
    return this.http.get<boolean>(url);
  }


  //Partie Recupération et envoi data 
  private questionAddedSubject = new BehaviorSubject<boolean>(false);

  questionAdded$ = this.questionAddedSubject.asObservable();

  emitQuestionAddedEvent() {
    this.questionAddedSubject.next(true);
  }
//pour l'envoie de id de objet pour delete or update
  private idSubject = new BehaviorSubject<string>(''); // Initialisez avec une valeur par défaut
  id$: Observable<string> = this.idSubject.asObservable();

  setId(id: string) {
    this.idSubject.next(id);
  }

  getId(): Observable<string> {
    return this.id$;
  }

  //pour l'envoie de boolean de objet pour ajout ou modifier

  private updated = new BehaviorSubject<boolean>(false);
  update$: Observable<boolean> = this.updated.asObservable();

setupdate(update :boolean) {
    this.updated.next(update);
  }

  getupdate(): Observable<boolean> {
    return this.update$;
  }
  //pour se différencier entre question ou answer pour le modal delete
  private estquestion = new BehaviorSubject<boolean>(false);
  estqu$: Observable<boolean> = this.estquestion.asObservable();

setEstqustion(  estqu :boolean) {
    this.estquestion.next(estqu);
  }

  getEstqustion(): Observable<boolean> {
    return this.estqu$;
  }
  //l'envoir de user 
  private Userq = new BehaviorSubject<UserCourzelo| null>(null);
  user$: Observable<UserCourzelo|null> = this.Userq.asObservable();

setuser(user :UserCourzelo) {
    this.Userq.next(user);
  }

  getyser(): Observable<UserCourzelo|null> {
    return this.user$;
  }



  

}

