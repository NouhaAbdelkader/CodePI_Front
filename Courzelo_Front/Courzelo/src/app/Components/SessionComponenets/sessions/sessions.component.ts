import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Class } from 'src/app/Models/AcademicProgramEntities/Class';
import { Module } from 'src/app/Models/AcademicProgramEntities/Module';
import { QuestionForum } from 'src/app/Models/ForumEntities/QuestionForum';
import { Session, TypeSession } from 'src/app/Models/SessionEntities/Session';
import {  Speciality, UserCourzelo } from 'src/app/Models/UserCorzelo/UserCourzelo';
import { ConsumerSessionService } from 'src/app/Services/SessionService/consumer-session.service';

@Component({
  selector: 'app-sessions',
  templateUrl: './sessions.component.html',
  styleUrls: ['./sessions.component.css']
})
export class SessionsComponent {


  formbuilder:FormGroup;
  editform:FormGroup;
  genform:FormGroup;
  teacher!:UserCourzelo;
  class!:Class;
  module!:Module;
  constructor(private r:Router ,private fb : FormBuilder, private ss: ConsumerSessionService ){
  this.formbuilder = fb.group({
    date : ['',Validators.required],
    startTime :['',Validators.required],
    endTime : ['',Validators.required]
  });
  this.editform = fb.group({
    date : ['',Validators.required],
    startTime :['',Validators.required],
    endTime : ['',Validators.required]
  });
  this.genform = fb.group({
    date : ['',Validators.required]
  });

  this.teacher = {
    id : undefined, 
    password:"azaxa", 
    firstName : "semer",
    lastName: "belghith",
    email: "dddd",
    image: "rrr",
    sexe: "homme",
    dateOfBirth: undefined,
    dateOfCreation:undefined,
    nbHoursMaxPerWeek: 10,
    nbHoursPerWeek : 0,
    //role: Role.Teacher,
    companyName: "esprit",
    descriptionRecruiter:'caedc',
    scoreXp: 30,
    username : undefined,
    //resume!:
    level:1,
    overAllAverage:2,
    speciality: Speciality.Angular,
    approved:  false,
    validVoteCount:0,
    canVote :  true,
    nbVoteForIncentives:10,
    nbPrimeVoteForBadge:10,
    PaymentDay: undefined,
    Hobbies:"string",
    questionForums:[] ,
  badges:[],
}

  this.class = {
    id:undefined,
    name:"string",
    Schedule: undefined,
    Students:undefined,
    level : undefined
  }
  this.module = {
    id:"string",
    name:"string",
    description:"string",
    nbHeurePerWeek:10,
    nbHeureTotal:10,
    Image:"string",
    coeff:2 ,
    program:undefined,
    tests: undefined,
    questionForums:[],
    semestre : undefined,
    classes: []

  }
  this.s = { id: undefined,date : undefined, startTime:'15:30',endTime:'16:30',conferanceLink:'',Participants:[],type:TypeSession.Course,day:1,temp:1,teacher:this.teacher,
  aclass: this.class, module:this.module};
  
  }
  s !:Session;
  ajouter(){
    console.log(this.formbuilder.value);

    this.s.date = this.formbuilder.get('date')?.value;
    this.s.startTime = this.formbuilder.get('startTime')?.value;
    this.s.endTime = this.formbuilder.get('endTime')?.value;

    this.ss.addSession(this.s).subscribe(
      {next: ()=> this.r.navigateByUrl('/sessions')}
    );
    
  }
  generate(){
    const dateControl = this.genform.get('date');
    console.log('selected date :', dateControl?.value.toString())
    this.ss.genrateSessions(dateControl?.value.toString()).subscribe(
      {next: ()=> this.r.navigateByUrl('/sessions')}
    )
    this.r.navigateByUrl('/sessions')
  }
  update(){
    console.log(this.editform.value);
    this.s.date = this.editform.get('date')?.value;
    this.s.startTime = this.editform.get('startTime')?.value;

    this.s.endTime = this.editform.get('endTime')?.value;

    this.ss.updateSession(this.s).subscribe(
      {next: ()=> this.r.navigateByUrl('/sessions')}
    );
  }
  getInfos(s:Session){
    this.editform.patchValue(s);
    this.s=s;
  }
  sessions:Session[]=[];
  
  ngOnInit(){
    this.ss.getSessions().subscribe(
      (result)=>{
        this.sessions = result; 
        console.log(this.sessions)
        this.sessions.forEach((e)=> {
          var newdate = ''+parseInt(e.date[0],10)+'/'+parseInt(e.date[1],10)+'/'+parseInt(e.date[2],10)+' '+parseInt(e.date[3],10)+':00'
          e.date = newdate.toString();
          //console.log(newdate);
        })
  })
    
    
  }
}
