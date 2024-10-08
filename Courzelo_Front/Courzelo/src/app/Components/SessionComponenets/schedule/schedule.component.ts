import { Component } from '@angular/core';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { Session } from 'src/app/Models/SessionEntities/Session';
import { ConsumerSessionService } from 'src/app/Services/SessionService/consumer-session.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent {

  viewDate: Date = new Date();
  view : CalendarView = CalendarView.Week;
  events: CalendarEvent[] = [];
  sessions: Session[] = [];
  constructor(private ss: ConsumerSessionService){
    /*const event = {
      title: "test session ",
      start: new Date("2024-03-25T08:00:00"),
      end: new Date("2024-03-25T10:00:00")
    }
    this.events.push(event);
    console.log("events : ");
    console.log(this.events)*/
    //this.events.push(event);
  }
  ngOnInit(){
    this.ss.getSessionsByClass("4SAE5").subscribe(
      (result: Session[]) => {
        console.log(result)
        result.forEach((e)=> {

          var newDate = `${e.date[0]}-0${e.date[1]}-0${e.date[2]}T0${e.date[3]}:00`;
          e.date = newDate.toString();
          console.log(newDate);
        })//2024-04-08T8:00
        this.events = result.map(session => ({
          title: session.teacher?.firstName as string, // Assuming title property exists in Session model
          start: new Date(session.date), // Assuming startDate property exists in Session model
          end: this.addHours(new Date(session.date), 2)// Assuming endDate property exists in Session model
        }));
        console.log(this.events);
        for(let i=0;i<this.events.length; i++){

        }
      }
    )
    
    /*for(let i=0; i< this.sessions.length; i++){
      var date = this.sessions[i].date;
      var n = parseInt(date.substring(11,12));
      n = n+2;
      console.log("after adding 2h :"+n);
      date = date.substring(13,date.length);
      var event = {
        title: this.sessions[i].module?.name,
        start: this.sessions[i].date,
        end: this.sessions[i].date
      }
    }*/
    
  }
  addHours(date: Date, hours: number): Date {
    return new Date(date.getTime() + hours * 60 * 60 * 1000);
  }

}
