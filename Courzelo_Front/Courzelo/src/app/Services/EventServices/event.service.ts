import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EventC } from 'src/app/Models/SessionEntities/Event';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http:HttpClient) { }

  getEvents(){
    return this.http.get<EventC[]>('http://localhost:8081/event/show');
  }
  addEvent(e: EventC){
    return this.http.post('http://localhost:8081/event/add',e);
  }
  updateEvent(e: EventC){
    return this.http.put('http://localhost:8081/event/update',e);
  }
  deleteEvent(id: string) {
    return this.http.delete(`http://localhost:8081/event/delete/${id}`);
  }

  getEstimation(Event : EventC){
    return this.http.post('http://localhost:8081/event/stats',Event);
  }

  getAllEstimation(){
    return this.http.post('http://localhost:8081/event/estimations',null);
  }
  
}
