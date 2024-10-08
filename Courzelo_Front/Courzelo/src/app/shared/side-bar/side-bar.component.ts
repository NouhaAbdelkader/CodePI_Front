import { Component } from '@angular/core';
import { VoteConsumerService } from 'src/app/Services/ForumService/vote-consumer.service';
import { TokenStorageService } from 'src/app/Services/UserCorzeloServices/token-storage.service';
import { UserService } from 'src/app/Services/UserCorzeloServices/user.service';
import { WebSocketService } from 'src/app/Services/EventServices/web-socket.service';
import { Client, IStompSocket, Message } from '@stomp/stompjs';
import { NotifService } from 'src/app/Services/EventServices/notif.service';
import { Notif } from 'src/app/Models/SessionEntities/Notif';
import { EventC } from 'src/app/Models/SessionEntities/Event';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Rsvp } from 'src/app/Models/SessionEntities/Rsvp';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent {
  content?: string;
  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;

  rangeVote!:number
  rangeExp!:number;
  rangeBadge!:number;
  


  ngOnInit(): void {
  
      ///For session 
      this.isLoggedIn = !!this.tokenStorageService.getToken();

      if (this.isLoggedIn) {
        const user = this.tokenStorageService.getUser();
        this.roles = user.roles;
  
        this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
        this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');
  
        this.username = user.username;
      }
      
      this.ss.getNotifs().subscribe(
        (data)=>{
          this.notifs=data;
          console.log(this.notifs);
        }
      )
    
      
  }
  logout(): void {
    this.tokenStorageService.signOut();
    //window.location.reload();
    this.r.navigateByUrl('/login')
    
  }

  /*public notif = "";

  constructor(private webSocketService: WebSocketService){
    const stompClient = new Client();
    stompClient.webSocketFactory = () => {
      // Create a wrapper function to cast the WebSocket instance to IStompSocket
      return this.createWebSocket('ws://your-websocket-endpoint');
    };
    
    stompClient.onConnect = () => {
      // Subscribe to notification topic
      stompClient.subscribe('/topic/notification', (notification: any) => {
        // Update notifications attribute with the recent message sent from the server
        this.notif = JSON.parse(notification.body).count;
      });
    };
    
    stompClient.activate();

  }
  private createWebSocket(url: string): IStompSocket {
    return new WebSocket(url) as any;
  }*/
  event!:EventC;
  addform:FormGroup;
  rsvp!:Rsvp;
  constructor(private r:Router,private ss: NotifService,private datePipe: DatePipe,private fb : FormBuilder,private voteService:VoteConsumerService,private userService: UserService,private tokenStorageService: TokenStorageService){
    this.addform = fb.group({
      status : ['',Validators.required],
    });
      this.event = {
        id:"string",
        name : "string",
        date : new Date(),
        location : "string",
        price : 25,
        description : "string",
        category:"",
        estimation : 10
      }
      this.rsvp = {
        id:undefined,
        event:this.event,
        status:"",
        user:undefined
      }
  }
  AddRsvp(){
    this.rsvp.event = this.event;
    this.rsvp.status = this.addform.get('status')?.value;
    this.ss.AddRsvp(this.rsvp).subscribe(
      {next: ()=> this.r.navigateByUrl('/events')}
    )

  }
  initializeEvent(notif: Notif){
    this.event = notif.event;
  }
  formatDate(timestamp: Date): string {
    const date = new Date(timestamp);
    return this.datePipe.transform(date, 'yyyy-MM-dd') || '';
  }
  notifs:Notif[]=[];
 

}
