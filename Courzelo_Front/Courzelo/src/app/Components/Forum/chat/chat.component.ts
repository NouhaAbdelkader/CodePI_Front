import { Component, ViewChild, ElementRef, AfterViewInit, OnInit, ChangeDetectorRef, NgZone } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { Observable, Subscription, catchError, map, of } from 'rxjs';
import { ChatRoom } from 'src/app/Models/ForumEntities/ChatRoom';
import { Incentives } from 'src/app/Models/ForumEntities/Incentives';
import { Media } from 'src/app/Models/ForumEntities/Media';
import { Message } from 'src/app/Models/ForumEntities/Message';
import { UserCourzelo } from 'src/app/Models/UserCorzelo/UserCourzelo';
import { WebSocketAPI } from 'src/app/Services/ForumService/WebSocketAPI';
import { ChatConsumerServiceService } from 'src/app/Services/ForumService/chat-consumer-service.service';
import { ConsumerQuestionServiceService } from 'src/app/Services/ForumService/consumer-question-service.service';
import { VoteConsumerService } from 'src/app/Services/ForumService/vote-consumer.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent   {
      //notif
      webSocketAPI!: WebSocketAPI;
      greeting: any;
      greeting2: any;
      name!: "you recieve a message ";
      prime2!:any;
      public notificationCount3Subject!: Subscription;
      public notificationCountSubject !: Subscription;
    //
 
  pollingInterval: any;
  isDone: boolean = false;
   chatForm: FormGroup;
   msg = 'Good work';
  idq!:string;
  id!:number ;
  user!:UserCourzelo;
  public chatList!: ChatRoom [];
  public chatData: any;
  public chatRoom!: ChatRoom;
  public idSubscription!: Subscription;
  public idSubscription1!: Subscription;
  public idSubscription2!: Subscription;
  public messageList: Message []=[];
  usernameChatSender!: any ;
  replymessage: String = 'checking';
  messageObj: Message = new Message();
  sendermessage:any 
  chatId!: number ;
  reeiver1!:any;
  sender1!:any;
  replyMediaContent!:Media
  senderId:any;
  idnew!: number;
  userStorage:any
  dataUri!:any ; 
  scrollTop!: number;
  listIncentives:Incentives[]=[];
  public approved= false ;
  sourceLanguage: string = 'en-GB';
  targetLanguage: string = 'en-GB';
  recognition: any;
  showVolumeUp?:any;
  idUser!: string;
  roles: string[] = [];
  username!:string
  userIdSender!:string;

  constructor(private voteService:VoteConsumerService,private cdr: ChangeDetectorRef,private chatService:ChatConsumerServiceService,private questionService:ConsumerQuestionServiceService,private route:Router, private ngZone: NgZone)
    {
      this.chatForm = new FormGroup({
        replymessage: new FormControl(),
      });
      this.recognition = new (window as any).webkitSpeechRecognition();
    this.recognition.interimResults = true;
    this.recognition.continuous = true;
    this.recognition.addEventListener("result", this.handleSpeechRecognition);
  }
  ngAfterViewInit() {
    setTimeout(() => {
      // Modifier la valeur de scrollTop ici
      // Par exemple, si vous modifiez la valeur de scrollTop d'un élément avec un identifiant "scrollElement"
      const scrollElement = document.getElementById('scrollElement');
      if (scrollElement) {
        scrollElement.scrollTop = 675; // Modifier la valeur selon vos besoins
      }
      // Forcer la détection des modifications après l'initialisation
      this.cdr.detectChanges();
    });
  }

  ngOnInit(){
    //session
    this.cdr.detectChanges();
    let user = sessionStorage.getItem('auth-user');
    console.log('User from sessionStorage:', user);
    if (user) {
      let userData = JSON.parse(user);
      console.log('Parsed user data:', userData);
      this.idUser = userData.id;
      this.username = userData.username;
      this.roles = userData.roles;
      console.log('Roles:', this.roles);
    }
    console.log("*********roles",this.roles)
    //
    //scroll
       //incetive
       //this.pollingInterval =setInterval(() => { 
        // this.userIdSender = sessionStorage.getItem('UserIdSender') as string;
        // console.log("**************sensennn*", this.userIdSender);
        // this.voteService.getIncentivesByTeacher(this.userIdSender ).subscribe((data) => {
        // this.listIncentives = data;
        // this.approved = this.listIncentives.every(a => a.teacher.approved);
        // //this.cdr.detectChanges();
        // console.log("***************ggggapprouved 1",this.approved)
        // });
    // },1000) 
    console.log("***************ggggapprouved 1",this.approved)
      //
   
     // notif
     this.webSocketAPI = new WebSocketAPI(new ChatComponent(this.voteService,this.cdr,this.chatService,this.questionService,this.route,this.ngZone));

     // Écouter un événement ou utiliser un callback pour savoir quand la connexion est établie
     this.webSocketAPI.onConnect(() => {
       // Une fois la connexion établie, s'abonner à la salle de discussion
       this.webSocketAPI._subscribeToChatRoom();
   
     });
     
     // Établir la connexion WebSocket
     this.webSocketAPI._connect();
   
  
     
     //

    // Abonnez-vous aux événements de navigation du Router
    this.route.events.subscribe(event => {
      // Vérifiez si l'événement est un démarrage de navigation
      if (event instanceof NavigationStart) {
        // Si oui, arrêtez le processus de long polling
        this.stopLongPolling();
      }
    });
 
    //
    this.sendermessage=sessionStorage.getItem('User');
    //le id de user provint de question (receiver)
    this.idSubscription = this.questionService.getId().subscribe(id => {
      this.idq = id;
    });
    
    //le id de chat
    this.idSubscription1 = this.chatService.getId().subscribe(id => {
      this.id = id;
      sessionStorage.setItem('id', this.id.toString());
      
    });
    this.senderId =sessionStorage.getItem('UserSession')
    const idFromSessionStorage = sessionStorage.getItem('chatId');
    this.userStorage =sessionStorage.getItem('UserSession');

    // Check if idFromSessionStorage is not null before parsing
    if (idFromSessionStorage !== null && this.id==0) {
      // Parse the id to an integer
      this.id = parseInt(idFromSessionStorage, 10);
      this.idnew = parseInt(idFromSessionStorage, 10);
      this.chatService
      .getChatRoomsBySenderOrReciver(this.idUser,this.idUser)
      .subscribe((data) => {
        // console.log(data);
        this.chatData = data;
        this.chatList = this.chatData;
        console.log("****************chatList",this.chatList)
    
       
      });
   
    
      this.pollingInterval =setInterval(() => {
      this.chatService.getChatById(this.idnew).subscribe(
        (data)=>{this.chatRoom=data
        
          this.messageList = this.chatRoom.messages;
          this.senderId=this.userStorage;
          this.reeiver1=this.chatRoom.receiver.username;
          this.sender1=this.chatRoom.sender.username;
        
     
       
        console.log("msg111**************",this.chatRoom.sender.username)  }
       
      )
    
    },1000) 
    } else {
      // Handle the case where the id is not found in sessionStorage
      console.error('ID not found in sessionStorage');
    
    console.log("***********idchayt:", idFromSessionStorage );
    
    //la list de chat pour le user en session
    this.chatService
    .getChatRoomsBySenderOrReciver(this.idUser,this.idUser)
    .subscribe((data) => {
      // console.log(data);
      this.chatData = data;
      this.chatList = this.chatData;
  
     
    });
    //recupére le user sender (je vais la refaire avec session) 
    this.pollingInterval =setInterval(() => {
    this.chatService.getChatById(this.id).subscribe(
      (data)=>{this.chatRoom=data
      
        this.messageList = this.chatRoom.messages;
        this.senderId=this.userStorage;
        this.reeiver1=this.chatRoom.receiver.username;
        this.sender1=this.chatRoom.sender.username;
      
   
     
      console.log("msg***************",this.chatRoom.sender.username)  }
     
    )},1000
    
    )
   
  
  }
    //this.usernameChatSender= sessionStorage.getItem('chatUser');
   

  }
  stopLongPolling(): void {
    // Arrêter le processus de long polling en effaçant l'intervalle
    clearInterval(this.pollingInterval);
  }
  ngOnDestroy() {
    if (this.idSubscription) {
      this.idSubscription.unsubscribe();
    }
    if (this.idSubscription1) {
      this.idSubscription1.unsubscribe();
    }
    if (this.idSubscription2) {
      this.idSubscription2.unsubscribe();
    }
    this.stopLongPolling();
    this.disconnect();
   
  }


  markDone() {
    //this.isDone = true;
    //this.approved=true // Set the task state to 'done'
  }
  notificationCount = 0;
  notificationCount2 = 0;
  notificationCount3 = 0;
  sendMessage() {
    this.messageObj.replymessage = this.chatForm.value.replymessage;
    //local stoarge 
    //this.messageObj.sendermessage = this.sendermessage;
    if (this.messageObj.replymessage.length > 1) {
      this.chatService
        .sendMessage(this.messageObj, this.id,this.idUser)
        .subscribe((data) => {
          //console.log(data);
          this.chatForm.reset();
          //this.sendMessageSocket(this.messageObj.replymessage)
          //this.handleMessage11(this.messageObj.replymessage)
          //this.handleMessage13(this.messageObj.replymessage)
          console.log("greeeet",this.greeting);
              // Incrémentez le compteur de notifications chaque fois qu'un message est envoyé
    
       
      


          // for displaying the messageList by the chatId
          this.chatService.getChatById(this.id).subscribe((data: any) => {
            //console.log(data);
            this.chatData = data;
            // console.log(this.chatData.messageList);console.log(JSON.stringify(this.chatData.messageList));
      
              this.messageList = this.chatData .messages;
              this.senderId=this.userStorage;
              this.reeiver1=this.chatData .receiver.username;
              this.sender1=this.chatData .sender.username;
              this.cdr.detectChanges();
          });
        });
    }
    }

    getChatById(idc:number){
      this.chatService.getChatById(idc).subscribe(
        (data)=>{this.chatRoom=data
        
          this.messageList = this.chatRoom.messages;
          this.senderId=this.userStorage;
          this.reeiver1=this.chatRoom.receiver.username;
          this.sender1=this.chatRoom.sender.username;
        
     
       
        console.log("msg111**************",this.chatRoom.sender.username)  }
       
      )
    }
    getChatBy2Users(id2:string){
      this.chatService.getChatRoomByUse1AndUser2(id2,this.idUser).subscribe(
        (data) => {
         
            this.chatId = data.id;
            sessionStorage.setItem('chatId', this.chatId.toString());
            sessionStorage.setItem('UserIdSender', data.sender.id);
            sessionStorage.setItem('UserSession', data.sender.username);
            sessionStorage.setItem('UserIdReciver', data.receiver.id);
            console.log("***************** the chat id ", this.chatId);
            this.chatService.setId(this.chatId);
            // Setting user session
            this.questionService.setuser(data.sender);
            this.route.navigate(['/forumChat']);
    
  })}
  getChatBy2UsersOpp(id2:string){
    this.chatService.getChatRoomByUse1AndUser1(id2,this.idUser).subscribe(
      (data) => {
       
          this.chatId = data.id;
          sessionStorage.setItem('chatId', this.chatId.toString());
          sessionStorage.setItem('UserIdSender', data.sender.id);
          sessionStorage.setItem('UserSession', data.sender.username);
          sessionStorage.setItem('UserIdReciver', data.receiver.id);
          console.log("***************** the chat id ", this.chatId);
          console.log("***************** the chat id  useeeeeeeeeeeer22", id2);
          console.log("***************** the chat id  useeeeeeeeeeeer111", this.idUser);
          this.chatService.setId(this.chatId);
          // Setting user session
          this.questionService.setuser(data.sender);
          this.route.navigate(['/forumChat']);
  
})}
  resetNotificationCount() {
    this.notificationCount = 0;
  }
  

  sendMedia(event: any) {
    const idFromSessionStorage1 = sessionStorage.getItem('chatId');

   
    if (idFromSessionStorage1 !== null && event?.target?.files?.length)
       this.idnew = parseInt(idFromSessionStorage1, 10);
      this.chatService
        .updateMediaChat(
          this.idnew ,
          event.target.files[0],
          event.target.files[0]?.type,
          this.idUser
        )
        .subscribe((data) => {
          // for displaying the messageList by the chatId
          this.chatService.getChatById(this.idnew).subscribe((data: any) => {
           console.log(data);
            this.chatData = data;
            console.log(this.chatData.messageList);console.log(JSON.stringify(this.chatData.messageList));
            this.messageList = this.chatData.messageList;
            this.reeiver1 = this.chatData.secondUserName;
            this.sender1= this.chatData.firstUserName;
            this.cdr.detectChanges();
          });
        });
       
  }

  imageCache: { [key: string]: string } = {};

getMediaUri3(replyMedia: string): string {
  // If the image is already cached, return its Base64 data
  if (this.imageCache[replyMedia]) {
    return this.imageCache[replyMedia];
  }

  // If the image is not cached, fetch it from the service
  this.chatService.getMediaById(replyMedia).subscribe((data: any) => {
    this.replyMediaContent = data;
    const base64Data = `data:${this.replyMediaContent.fileType};base64,${this.replyMediaContent.picture.data}`;
    // Cache the Base64 data for future use
    this.imageCache[replyMedia] = base64Data;
    console.log(base64Data, "Base64 Data"); // Log to verify Base64 data
    this.cdr.detectChanges(); // Ensure change detection is triggered
  });
  

  // Initially return null or a placeholder image to avoid errors in template
  return "null"; // or return a placeholder image URL
}
  
//notif
connect(){
  this.webSocketAPI._connect();
  console.log("connexion*******")
}


disconnect(){
  this.webSocketAPI._disconnect();
}

sendMessageSocket(m:any) {
  // Check if WebSocket connection is available
  if (this.webSocketAPI && this.webSocketAPI.stompClient && this.webSocketAPI.stompClient.connected) {
      // Envoyer le message via WebSocket
      this.webSocketAPI._send({ message: m});
      console.log('Message sent!!!!!!!!!!: ', m);
  } else {
      console.error('WebSocket connection is not available.');
  }
}

handleMessage11(message:any){
  console.log('Message recieve!!!!!!!!!!: ', message);

  this.greeting = message;
  if (this.greeting ) {
    this.notificationCountSubject = this.chatService.getnotificationCount().subscribe(notificationCount => {
      this.notificationCount = notificationCount;}) ;
    this.notificationCount++;
  }
    this.chatService.setnotificationCount(this.notificationCount);
  this.chatService.setgreeting(this.greeting);
  
}
handleMessage13(message:any){
  console.log(' message negative here attention please from chatController!!!!!!!!!!: ', message);
  this.greeting2 = message;
  if (this.greeting2 ) {
    this.notificationCount3Subject = this.chatService.getnotificationCount3().subscribe(notificationCount3 => {
      this.notificationCount3 = notificationCount3;}) ;
    this.notificationCount3++;
  }
  this.chatService.setnotificationCount3(this.notificationCount3);
this.chatService.setgreeting2(this.greeting2);

    
console.log("greeeetnajoooooooooooooooooo",this.greeting2);

}
 ApprouvedExolication(){
  //SENDER
  this.userIdSender = sessionStorage.getItem('UserIdSender') as string;
  console.log("**************sensennn*", this.userIdSender);
  this.voteService.AddIncentives(this.userIdSender).subscribe({
    next: () => {
      console.log("**********************",this.approved)
      this.voteService.getIncentivesByTeacher(this.userIdSender).subscribe((data) => {
        this.listIncentives = data;
        this.approved = this.listIncentives.every(a => a.teacher.approved);
        //this.cdr.detectChanges();
        console.log("***************approuved 1ssssssssss",this.approved)
       // this.handleMessage12(this.prime2)
       
        //console.log("***************approuved 1 la valeur de prime",this.prime2)
     
      

        //this.connect();
      });
  
    }
  });
}
handleMessage12(message:any){
  console.log('Message recieve from prim explication nooo ***!!!!!!!!!!: ', message);
  this.prime2 = message ;
  
  console.log('Message recieve from prim explication nooo paruum ***!!!!!!!!!!: ', this.prime2);
  
  if (this.prime2!= null) {
    this.ngZone.run(() => {
      this.notificationCount2++;
      console.log('Notification count after increment def: ', this.notificationCount2);
      this.cdr.detectChanges();
      this.chatService.setnotificationCount2(this.notificationCount2);
      this.chatService.setprime2(this.prime2);
    });
  }

}


resetNotificationCount2() {
  this.notificationCount2 = 0;
}
voiceInput() {
  if (this.recognition && this.recognition.isListening) {
    this.recognition.stop();
    this.recognition.isListening = false;
  } else {
    this.recognition.lang = this.sourceLanguage;
    this.recognition.start();
    this.recognition.isListening = true;
  }
}

handleSpeechRecognition = (e: any) => {
  const text = Array.from(e.results)
    .map((result: any) => result[0])
    .map((result: any) => result.transcript)
    .join("");

  //this.replymessage = text;
  console.log("texttttttttttttt",this.replymessage)
  this.chatForm.get('replymessage')?.setValue(text);
  //  this.chatForm.get('replymessage')?.setValue(text);
};
speak(text: String, language: string){
  let utterance = new SpeechSynthesisUtterance(text as string );
  utterance.lang = language;
  speechSynthesis.speak(utterance);
}
   
 
}
