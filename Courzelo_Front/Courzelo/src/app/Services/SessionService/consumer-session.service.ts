import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Session } from 'src/app/Models/SessionEntities/Session';

@Injectable({
  providedIn: 'root'
})
export class ConsumerSessionService {
  constructor(private http:HttpClient) { }

  getSessions(){
    return this.http.get<Session[]>('http://localhost:8081/session/show');
  }

  getSessionsByClass(name: string){
    return this.http.post<Session[]>('http://localhost:8081/session/showSchedule',name);
  }

  addSession(p : Session){
    return this.http.post('http://localhost:8081/session/add', p );
  }

  updateSession(p:Session){
    return this.http.put('http://localhost:8081/session/update',p);
  }

  genrateSessions(d: string){

    return this.http.post('http://localhost:8081/session/generate',d);
  }




}
