import { Component,Input,ViewChild  } from '@angular/core';
import { AnswerComponent } from '../answer/answer.component';
import { ConsumerQuestionServiceService } from 'src/app/Services/ForumService/consumer-question-service.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { ConsumerAnswerServiceService } from 'src/app/Services/ForumService/consumer-answer-service.service';


@Component({
  selector: 'app-modal-confirmation',
  templateUrl: './modal-confirmation.component.html',
  styleUrls: ['./modal-confirmation.component.css']
  
})
export class ModalConfirmationComponent {

  @ViewChild( AnswerComponent) child:any;
  id: string = '';
  estqu!:boolean;
  public idSubscription!: Subscription;
  public estQuestionSubscription!:Subscription;;
  constructor(public modalRef: MdbModalRef<ModalConfirmationComponent>,private questionService :ConsumerQuestionServiceService,private route:Router,private answerService:ConsumerAnswerServiceService){}
  ngOnInit() {
    this.idSubscription = this.questionService.getId().subscribe(id => {
      this.id = id;
    });
    this.estQuestionSubscription = this.questionService.getEstqustion().subscribe(estqu => {
      this.estqu = estqu;
    });
    console.log("**************heyyyy",this.estqu)
  }

comeBackToQuestions(){
  this.questionService.getAllQuestion().subscribe(
   ()=>this.route.navigateByUrl('/forumQuestion')
  )
  
}

  ngOnDestroy() {
    this.idSubscription.unsubscribe();
    this.estQuestionSubscription.unsubscribe();
  }
  close(): void {
    const closeMessage = 'Modal closed';
    this.modalRef.close(closeMessage)
  }
  deleteAnswer(){ 
    if(this.estqu){ 
     this.questionService.deleteQuestion(this.id).subscribe(
       
     ()=>{
       this.comeBackToQuestions() ;
       this.close();
       this.ngOnDestroy();
     }
   
   
   );}
   else {
     this.answerService.deleteAnswer(this.id).subscribe(
       ()=>{
        
         this.close();
         this.ngOnDestroy();
         window.location.reload();
       }
     );
   
   }
      
   
   }

 

}
