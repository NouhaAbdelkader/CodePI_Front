import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Notif } from 'src/app/Models/SessionEntities/Notif';
import { Rsvp } from 'src/app/Models/SessionEntities/Rsvp';

@Injectable({
  providedIn: 'root'
})
export class NotifService {

  constructor(private http:HttpClient) { }

  getNotifs(){
    return this.http.get<Notif[]>('http://localhost:8081/notif/show');
  }

  AddRsvp(r:Rsvp){
    return this.http.post('http://localhost:8081/rsvp/add',r);
  }
}
