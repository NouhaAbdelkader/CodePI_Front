import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionForum } from 'src/app/Models/ForumEntities/QuestionForum';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ConsumerQuestionServiceService } from 'src/app/Services/ForumService/consumer-question-service.service';
import { ModalConfirmationComponent } from '../modal-confirmation/modal-confirmation.component';
import { ModalpopupComponentComponent } from '../modalpopup-component/modalpopup-component.component';
import { Answer } from 'src/app/Models/ForumEntities/Answer';
import { ConsumerAnswerServiceService } from 'src/app/Services/ForumService/consumer-answer-service.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ChatConsumerServiceService } from 'src/app/Services/ForumService/chat-consumer-service.service';
import { ChatRoom } from 'src/app/Models/ForumEntities/ChatRoom';
import { Vote } from 'src/app/Models/ForumEntities/Votes';
import { VoteConsumerService } from 'src/app/Services/ForumService/vote-consumer.service';
import { Observable, tap } from 'rxjs';
import Swal from 'sweetalert2';
import { RateQuestion } from 'src/app/Models/ForumEntities/RateQuestion';
import { WebSocketAPI } from 'src/app/Services/ForumService/WebSocketAPI';
import { WebSocketPrime } from 'src/app/Services/ForumService/WebSocketPrime';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.css']
})
export class AnswerComponent {
  webSocketAPI!: WebSocketPrime;
  id!:string ;
  question!:QuestionForum;
  listAnswers:Answer[]=[];
  registerForm!: FormGroup;
  public chatData: any;
  public chatList: any = [];
  chatId!: number ;
  chatObj: ChatRoom = new ChatRoom();
  chat:any;
  student:any;
  module:any
 vote!:Vote;
 ans!:Answer;
 primes:any
 prime2:any
 //Vote pour la coloration bleu lors de vote 
 upVoted: { [id: string]: boolean } = {};
 downVoted: { [id: string]: boolean } = {};

 voteNumber!:number;

 containsProfanity = false;
 //Rate 
 ratingcontrol=new FormControl(0);
 rate!:RateQuestion;
 rateNumber!:number
 idUser!: string;
 roles:any ={} ;
 canVote=true ;
 avatarColor: string = '';
  //@Output() notif=new EventEmitter(); // 1ére etape
   
  
  constructor(private chatService:ChatConsumerServiceService,private questionService :ConsumerQuestionServiceService,private answerService :ConsumerAnswerServiceService ,private route:Router,private router:ActivatedRoute,private modalService: MdbModalService,private voteService:VoteConsumerService ) {}

  ngOnInit(){
    //
    this.generateRandomColor();
    //session
    let user = sessionStorage.getItem('auth-user');
    if (user) {
      let userData = JSON.parse(user);
      this.idUser = userData.id;
      //this.username = userData.username;
      this.roles = userData.roles;
   
    }
    console.log(this.canVote,"canVote ngOnInt **************")
  
    console.log("****************************vote heyyyyy id user",this.idUser)
    this.id=this.router.snapshot.params['id'];
    console.log('ID de la question:', this.id);
    this.questionService.getQuestionById(this.id).subscribe(
     (data)=>{this.question= data
    this.student=data.student.username
  this.module=data.module.name}
    )
    //recupére le user
    this.voteService.getUserById(this.idUser).subscribe(
      (data)=>{
        this.canVote=data.canVote
        console.log(data,"heelaaaaaaaaaaaaaaaaa")
      }
     )
    //pour recupérer tous les answers d'une question

    this.answerService.getAnswerByQuestion(this.id).subscribe(
      (data)=>this.listAnswers= data
     )
     //Forumulaire d'ajout answer
     this.registerForm= new FormGroup({
      id:new FormControl(),
      message: new FormControl('',[Validators.required,Validators.minLength(5)]),

    

    });
  

  
 
  
    this.answerService.getAnswerByQuestion(this.id).pipe(
      tap((answers) => {
        this.listAnswers = answers;
        this.listAnswers.forEach(answer => {
          this.upVoteCouleur(answer.id);
          console.log("*********couleur dans ng on initi",this.listAnswers)
        });
      })
    ).subscribe();
    this.answerService.getAnswerByQuestion(this.id).pipe(
      tap((answers) => {
        this.listAnswers = answers;
        this.listAnswers.forEach(answer => {
          this.downVoteCouleur(answer.id);
          console.log("*********couleur dans ng on initi",this.listAnswers)
        });
      })
    ).subscribe();


    this.questionService.getRateByqIdAndUser(this.id,this.idUser).subscribe(
      (data) => {
        this.rate = data;
        this.rateNumber=data.rateNumber;
      });
           // notif
     this.webSocketAPI = new WebSocketPrime(new AnswerComponent(this.chatService,this.questionService,this.answerService,this.route,this.router,this.modalService,this.voteService));

     // Écouter un événement ou utiliser un callback pour savoir quand la connexion est établie
     this.webSocketAPI.onConnect(() => {
       // Une fois la connexion établie, s'abonner à la salle de discussion
       //this.webSocketAPI._subscribeToChatRoom();
   
     });
     
     // Établir la connexion WebSocket
     this.webSocketAPI._connect();


  
  }


  isMessageValid = false;

  messageInput(event: any) {
    const message = event.target.value;
    const isWhitespace = (message || '').trim().length === 0;
  
    this.isMessageValid = !isWhitespace && message.length >= 5;
  }

modalRef: MdbModalRef<ModalConfirmationComponent> | null = null;

openModal(id:string,estqu:boolean) {
  this.modalRef = this.modalService.open(ModalConfirmationComponent)
  this.questionService.setId(id);
  this.questionService.setEstqustion(estqu);
  console.log("****************1",id)
  console.log("****************22",estqu)
}
openModalEfface(id:string) {
  this.modalRef = this.modalService.open(ModalConfirmationComponent)
  this.questionService.setId(id);
  console.log("****************1",id)
}

modalRef2: MdbModalRef<ModalpopupComponentComponent> | null = null;

openModal2(update:boolean,id:string) {
  this.modalRef2 = this.modalService.open(ModalpopupComponentComponent)
  this.questionService.setupdate(update);
  this.questionService.setId(id);
  
}
onSubmit() {
  const messages = this.registerForm.value.message;

  this.questionService.getQuestionById(this.id).subscribe(
    (data) => {
      this.question = data;
      console.log("MOuuuuuuuuuuu", this.question);

      // Create the combined object
      const answer: Answer = new Answer();
      answer.message = messages;
      answer.question = this.question;
      this.answerService.AddAnswer(answer, this.id,this.idUser).subscribe({
        next: () => {
          //this.questionService.emitQuestionAddedEvent()
          window.location.reload(); // Rafraîchir la page
        }
      });

      // this.checkProfanity(answer.message).subscribe(isProfane => {
      //   if (isProfane == false) {
      //     // Call the service method with the combinedObject and idModule
      //     this.answerService.AddAnswer(answer, this.id,this.idUser).subscribe({
      //       next: () => {
      //         //this.questionService.emitQuestionAddedEvent()
      //         window.location.reload(); // Rafraîchir la page
      //       }
      //     });
      //   } else {
      //     console.log("There is a bad word here ****************");
      //     Swal.fire({
      //       icon: 'error',
      //       title: 'Oops...',
      //       text: 'Your answer contains prohibited words. Please revise your input.',
      //     });
      //   }
      // });
    }
  );
}

goToChat(): void {
  this.chatService.getChatRoomByUse1AndUser2(this.question.student.id,this.idUser).subscribe(
    (data) => {
      if (data && data.id) {
        this.chatId = data.id;
        sessionStorage.setItem('chatId', this.chatId.toString());
        sessionStorage.setItem('UserSession', this.idUser);
        sessionStorage.setItem('UserSession', data.sender.username);
        sessionStorage.setItem('UserIdSender', data.sender.id);
        sessionStorage.setItem('UserIdReciver', data.receiver.id);
        console.log("***************** the chat id ", this.chatId);
        this.questionService.setId(this.question.student.id);
        this.chatService.setId(this.chatId);
        // Setting user session
        this.questionService.setuser(data.sender);
        this.route.navigate(['/forumChat']);
      } else {
        this.chatObj.receiver = this.question.student;
        this.chatService.createChatRoom(this.chatObj, this.question.student.id,this.idUser).subscribe((data) => {
          this.chatData = data;
          this.chatId = this.chatData.chatId;
          sessionStorage.setItem('chatId', this.chatData.chatId);
          sessionStorage.setItem('UserSession', this.idUser);
          this.chatService.getChatRoomsBySenderOrReciver(this.idUser,this.idUser).subscribe((data) => {
            this.chatData = data;
            this.chatList = this.chatData;
            this.questionService.setId(this.question.student.id);
            this.chatService.setId(this.chatId);
            this.route.navigate(['/forumChat']);
            console.log("***************** the chat LIST ", this.chatList);
          });
        });
      }
    },
    (error) => {
      console.error("Error occurred while fetching chat room:", error);
      if (error.status == 404) {
      this.chatObj.receiver = this.question.student;
        this.chatService.createChatRoom(this.chatObj, this.question.student.id,this.idUser).subscribe((data) => {
          this.chatData = data;
          this.chatId = this.chatData.chatId;
          sessionStorage.setItem('chatId', this.chatData.chatId);
          sessionStorage.setItem('UserSession', this.chatData.sender.id);
          this.chatService.getChatRoomsBySenderOrReciver(this.idUser,this.idUser).subscribe((data) => {
            this.chatData = data;
            this.chatList = this.chatData;
            this.questionService.setId(this.question.student.id);
            this.chatService.setId(this.chatId);
            this.route.navigate(['/forumChat']);
            console.log("***************** the chat LIST ", this.chatList);
          });
        });
    }else {
    }}
  );
}

//
goToChat2() {
  this.chatService.getChatRoomByUse1AndUsernajiba(this.question.student.id,this.idUser)
    .subscribe(
      
       (data) => {this.chatId = data.id;
          sessionStorage.setItem('chatId', this.chatId.toString());  
          sessionStorage.setItem('UserSession', this.idUser);
          sessionStorage.setItem('UserSession', data.receiver.username);
            
          console.log("***************** the chat id ",this.chatId)
           this.questionService.setId(this.question.student.id)
       this.chatService.setId(this.chatId);
       console.log("***********hayt:",this.chatId);
       //le user de session
       this.questionService.setuser(data.sender);
          this.route.navigate(['/forumChat']);},
      (data) => { if (data && data.id) { // Vérifier si 'data' et 'data.id' sont non null
        this.chatId = data.id;
        sessionStorage.setItem('chatId', this.chatId.toString());
        //userSession
        sessionStorage.setItem('UserSession', data.sender.username);


    } else {
        //console.log("error*****************1")
       
            //this.chatObj.sender.firstName= this.question.user.id;
            this.chatObj.receiver = this.question.student;
            //je dois passer le id de user session
            this.chatService.createChatRoom(this.chatObj,this.question.student.id,this.idUser).subscribe((data) => {
              this.chatData = data;
              this.chatId = this.chatData.chatId;
              sessionStorage.setItem('chatId', this.chatData.chatId);
              sessionStorage.setItem('UserSession', this.chatData.sender.id);
              //console.log("***************** the chat id 22 ",this.chatData.chatId)
              //je dois passer le id de user session
              this.chatService
              .getChatRoomsBySenderOrReciver(this.idUser,this.idUser)
                .subscribe((data) => {
                  // console.log(data);
                  this.chatData = data;
                  this.chatList = this.chatData;
                  this.questionService.setId(this.question.student.id)
                  this.chatService.setId(this.chatId);
                  this.route.navigate(['/forumChat']);
                  console.log("***************** the chat LIST ",this.chatList)
                });
                
              
            });
           
        
    }
          
      }
       
    
    
    );
   
}

upVote(idAnswer:string){
  this.voteService.getVotesByUserAndAnswer(idAnswer,this.idUser).subscribe(
    (data)=>{this.vote= data
     
    if(this.vote!=null && this.vote.voteType==-1){
     
      this.vote.voteType=1
     

      this.voteService.updateVote(this.vote).subscribe(()=>{
        this.refreshVoteNumber(idAnswer);
    
      })
      this.upVoted[idAnswer] = true;
      this.downVoted[idAnswer] = false;
      
    }
    else if(this.vote!=null && this.vote.voteType==1) {
      console.log("****************************vote",this.vote.id)
      this.voteService.deleteAnswer(this.vote.id).subscribe(()=>{
        this.refreshVoteNumber(idAnswer);
      });
      this.upVoted[idAnswer] = false;
    

    }
  else if(this.vote==null){
    const vv: Vote = new Vote();
    this.answerService.getAnswerById(idAnswer).subscribe(
      (data)=>{this.ans=data 

    
    vv.voteType=1
    vv.answer=this.ans;
    this.voteService.AddVote(vv,idAnswer,this.idUser).subscribe(()=>{
      this.refreshVoteNumber(idAnswer);
      this.voteService.getUserById(this.idUser).subscribe(
        (data)=>{
          this.canVote=data.canVote
          console.log(data,"heelaaaaaaaaaaaaaaaaa")
        }
       )
    })
    this.upVoted[idAnswer] = true;
            this.downVoted[idAnswer] = false;
           
      })

}}
)


}

downVote(idAnswer:string){
  this.voteService.getVotesByUserAndAnswer(idAnswer,this.idUser).subscribe(
    (data)=>{this.vote= data
      //console.log("****************************vote",data, idAnswer)
    if(this.vote!=null && this.vote.voteType==1){
      console.log("****************************vote",this.vote.voteType)
   
        this.vote.voteType=-1

     

      this.voteService.updateVote(this.vote).subscribe(()=>{
        this.refreshVoteNumber(idAnswer);
     
      })
      this.downVoted[idAnswer] = true;
      this.upVoted[idAnswer] = false;
   
    }
    else if(this.vote!=null && this.vote.voteType==-1) {
      console.log("****************************vote",this.vote.id)
      this.voteService.deleteAnswer(this.vote.id).subscribe(()=>{
        this.refreshVoteNumber(idAnswer);
      });
      this.downVoted[idAnswer] = false;

    }
  else if(this.vote==null){
    const vv: Vote = new Vote();
    this.answerService.getAnswerById(idAnswer).subscribe(
      (data)=>{this.ans=data 

    
    vv.voteType=-1
    vv.answer=this.ans;
    this.voteService.AddVote(vv,idAnswer,this.idUser).subscribe(()=>{
      this.refreshVoteNumber(idAnswer);
      this.voteService.getUserById(this.idUser).subscribe(
        (data)=>{
          this.canVote=data.canVote
          console.log(data,"heelaaaaaaaaaaaaaaaaa")
        }
       )
    })
    this.downVoted[idAnswer] = true;
    this.upVoted[idAnswer] = false;
 
      })

}}
)

}
upVoteCouleur(answerId:string) {
  this.voteService.getVotesByUserAndAnswer(answerId,this.idUser).subscribe(
    (data) => {
      this.vote = data;
      if (this.vote != null && this.vote.voteType == 1) {
      
        this.upVoted[answerId] = true;
        this.downVoted[answerId] = false;
      
      } else {
        this.upVoted[answerId] = false;
       
      }
     
    }
  );
}
downVoteCouleur(answerId:string) {
  this.voteService.getVotesByUserAndAnswer(answerId,this.idUser).subscribe(
    (data) => {
      this.vote = data;
      if (this.vote != null && this.vote.voteType == -1) {
        
        this.upVoted[answerId] = false;
        this.downVoted[answerId] = true;
      } else {
        this.downVoted[answerId] = false;
      }
    }
  );
}
refreshVoteNumber(idAnswer: string) {
  this.answerService.getAnswerById(idAnswer).subscribe(
    (data) => {
      const answer = this.listAnswers.find(answer => answer.id === idAnswer);
      if (answer) {
        answer.nbrVote = data.nbrVote;
      }
    }
  );
}

//Profanity 
checkProfanity(text: string): Observable<boolean> {
  return new Observable<boolean>(observer => {
    this.questionService.checkProfanity(text).subscribe(
      (data) => {
        this.containsProfanity = data;
        observer.next(this.containsProfanity);
        observer.complete();
      },
      (error) => {
        console.error(error);
        observer.error(error);
      }
    );
  });
}
//Rating 
GetRating(){

  const rate: RateQuestion = new RateQuestion();
 
  rate.rateNumber = this.ratingcontrol.value ?? 0;

  console.log('rate object:', rate);
  console.log('idQuestion:', this.id);
  this.questionService.getRateByqIdAndUser(this.id,this.idUser).subscribe(
    (data) => {
      this.rate = data;
      if (this.rate != null) {
        this.rate.rateNumber=this.ratingcontrol.value ?? 0;
        // If a rating exists, update it
        this.questionService.updateRate(this.rate).subscribe({
          next: () => {
            console.log('************Rating updated successfully', rate);
         
          },
          error: (error) => {
            console.error('**************There was an error!', error);
          },
        });
      } else {
        // If no rating exists, add a new one
        this.questionService.AddRating(rate, this.id,this.idUser).subscribe({
          next: () => {
            console.log('************Rating added successfully');
           
          },
          error: (error) => {
            console.error('**************There was an error!', error);
          },
        });
      }
    }
  ); 
}
AnswersOrderByVote(){
  this.answerService.getAnswerByQuestionOrderByVote(this.id).subscribe(
    (data)=>this.listAnswers= data
   )
   //Fo
}

connect(){
  this.webSocketAPI._connect();
  console.log("connexion*******")
}

disconnect(){
  this.webSocketAPI._disconnect();
}
notificationCount3 = 0;
handleMessage11(message:any){
  console.log('Message recieve!!!!!!!!!!: ', message);
  this.primes = message;
   
  if (this.primes!= null) {
  
      this.notificationCount3++;
      console.log('Notification count after increment def: ', this.notificationCount3);
   
      this.chatService.setnotificationCount2(this.notificationCount3);
      this.chatService.setprime2(this.primes);

  }

}
handleMessage12(message:any){
  console.log('Message recieve from prim explication ***!!!!!!!!!!: ', message);
  this.prime2 = message;
}

generateRandomColor(): void {
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);
  this.avatarColor = `#${randomColor}`;
}

}

