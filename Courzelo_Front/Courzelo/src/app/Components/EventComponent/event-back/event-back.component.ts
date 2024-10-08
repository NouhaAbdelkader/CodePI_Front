import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EventC } from 'src/app/Models/SessionEntities/Event';
import { EventService } from 'src/app/Services/EventServices/event.service';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-event-back',
  templateUrl: './event-back.component.html',
  styleUrls: ['./event-back.component.css']
})
export class EventBackComponent {
  addform:FormGroup;
  editform:FormGroup;
  event : EventC;
  eventDate : Date;
  constructor(private r:Router,private fb : FormBuilder , private ss: EventService,private datePipe: DatePipe ){
    this.addform = fb.group({
      date : ['',Validators.required],
      name :['',Validators.required],
      price : ['',Validators.required],
      location : ['',Validators.required],
      description : ['',Validators.required],
      category:['',Validators.required]
    });
    this.eventDate = new Date();
    this.editform = fb.group({
      date : ['',Validators.required],
      name :['',Validators.required],
      price : ['',Validators.required],
      location : ['',Validators.required],
      description : ['',Validators.required],
      category:['',Validators.required]
    });
    this.event = {
      id : undefined,
      date : new Date(),
      name : "",
      price : 2.2,
      description : "" ,
      location : "",
      category : "",
      estimation : 10
    }
  }
  events: EventC[] = [];
  openDialog() {
    document.getElementById("dialog").style.display = "block";
  }
  
  addEvent(){
    this.event.date = this.addform.get('date')?.value;
    this.event.name = this.addform.get('name')?.value;
    this.event.price = this.addform.get('price')?.value;
    this.event.location = this.addform.get('location')?.value;
    this.event.description = this.addform.get('description')?.value;
    this.event.category = this.addform.get('category')?.value;
    this.ss.addEvent(this.event).subscribe(
      {next: ()=> this.r.navigateByUrl('/events')}
    );
  }
  UpdateEvent(){
    if(this.editform.get('date')?.value != null ){
      this.event.date = this.editform.get('date')?.value;
    }
    
    this.event.name = this.editform.get('name')?.value;
    this.event.price = this.editform.get('price')?.value;
    this.event.location = this.editform.get('location')?.value;
    this.event.description = this.editform.get('description')?.value;
    this.event.category = this.addform.get('category')?.value;
    this.ss.updateEvent(this.event).subscribe( {
      next: () => this.r.navigateByUrl('/events')
    })
  }
  DeleteEvent(){
    this.ss.deleteEvent(this.event.id).subscribe(
      { next : () => this.r.navigateByUrl('/events')}
    )
  }
  getInfos(e : EventC){
    this.editform.patchValue(e);
    this.event=e;
    
       //this.event.date = this.formatDate(this.event.date);
    //console.log(this.editform.value);
  }
  
  
  formatDate(timestamp: Date): string {
    const date = new Date(timestamp);
    return this.datePipe.transform(date, 'yyyy-MM-dd') || '';
  }
  ngOnInit(){
    this.ss.getEvents().subscribe( (data)=> {
      this.events = data;
      console.log(data);
      /*this.events.forEach((e)=> {
        //const dateArray = e.date as unknown as number[];
        //const dateObject = new Date(dateArray[0], dateArray[1] - 1, dateArray[2], dateArray[3], dateArray[4], dateArray[5], dateArray[6]);
        //e.date = dateObject;
        //var newdate = ''+parseInt(e.date[0],10)+'/'+parseInt(e.date[1],10)+'/'+parseInt(e.date[2],10)+' '+parseInt(e.date[3],10)+':00'
        //e.date = newdate.toString();
        //console.log(newdate);
      })*/
    })
    /*this.events.forEach((e)=> {
      this.ss.getEstimation(e)/*.pipe(
        map(data => {
          // transform the data here
          const transformedData = {
            
          }; // replace this with actual transformation logic
          return transformedData;
        })
      ).subscribe( (data)=> {
        console.log(data);
      })
    })*/
    this.ss.getAllEstimation().subscribe(
      {next : ()=> {console.log("Getting Estimations Done ! ");}}
    )

    
  }

}
