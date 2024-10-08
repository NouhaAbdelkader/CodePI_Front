import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { Observable, Subscription, forkJoin } from 'rxjs';
import { Module as Mod } from 'src/app/Models/AcademicProgramEntities/Module';
import Swal from 'sweetalert2';
import { QuestionForum } from 'src/app/Models/ForumEntities/QuestionForum';
import { WebSocketAPI } from 'src/app/Services/ForumService/WebSocketAPI';
import { ConsumerQuestionServiceService } from 'src/app/Services/ForumService/consumer-question-service.service';

@Component({
  selector: 'app-modalpopup-component',
  templateUrl: './modalpopup-component.component.html',
  styleUrls: ['./modalpopup-component.component.css']
})
export class ModalpopupComponentComponent {
  //

  //
 
  registerForm!: FormGroup;
  ngDropdown ="Choose";
  listModule:Mod[]=[];
  moduleb!:Mod
  listQuestion!: QuestionForum[];
  update!:boolean;
  idq!:string;
  p!:any ;
  public idSubscription!: Subscription;
  public subscription!: Subscription;
  question!: QuestionForum;
  containsProfanity = false;
  idUser!: string;
  roles:any ={} ;

 

  constructor(public modalRef: MdbModalRef<ModalpopupComponentComponent>,private questionService :ConsumerQuestionServiceService ,private route:Router,private router:ActivatedRoute) {}
  close(): void {
    const closeMessage = 'Modal closed';
    this.modalRef.close(closeMessage)
  }
  ngOnInit(){
    //session
    let user = sessionStorage.getItem('auth-user');
    if (user) {
      let userData = JSON.parse(user);
      this.idUser= userData.id;
      //this.username = userData.username;
      this.roles = userData.roles;
    }
    //
 

    this.registerForm= new FormGroup({
      id:new FormControl(),
      title: new FormControl('',[Validators.required,Validators.minLength(5)]),
      description: new FormControl('',[Validators.required,Validators.minLength(5)]),
      module:new FormControl('',Validators.required)
    

    });

   
    
     //pour avoir tous les module 
    this.questionService.getAllModules().subscribe(
      (data)=>this.listModule=data
    )
//pour  le update ou l'ajout recupératipn de boolean et le id
    this.subscription = this.questionService.getupdate().subscribe(update => {
      this.update = update;
    });
    this.idSubscription = this.questionService.getId().subscribe(id => {
      this.idq = id;
    });


    if(this.update==true){
      this.questionService.getQuestionById(this.idq).subscribe(
        (data)=>{this.p=data ,
        this.registerForm.patchValue(this.p);}
        
      )
    
   
      
    }
   
  
  }
  ngOnDestroy() {
    this.idSubscription.unsubscribe();
    this.subscription.unsubscribe();
  
  }
  onSubmit(){
    console.log(this.registerForm.value);
    alert('SUCCES\n\n'+ JSON.stringify(this.registerForm.value,null,4))
  }
  refresh(){
    this.questionService.getAllQuestion().subscribe(
      (data)=>this.listQuestion=data
    )
    
  }

  updatepop() {
    const title = this.registerForm.value.title;
    const description = this.registerForm.value.description;
  
    this.questionService.getQuestionById(this.idq).subscribe(
      (data) => {
        this.question = data;
        this.moduleb = this.question?.module; // Use optional chaining
        console.log("MOuuuuuuuuuuu", this.question);
  
        // Create the combined object
        const question1: QuestionForum = new QuestionForum();
        question1.id = this.idq;
        question1.title = title;
        question1.description = description;
        question1.module = this.moduleb;
  
        forkJoin({
          titleProfanity: this.checkProfanity(question1.title),
          descriptionProfanity: this.checkProfanity(question1.description)
        }).subscribe(results => {
          if (results.titleProfanity == false && results.descriptionProfanity == false) {
            // Call the service method with the combinedObject and idModule
            this.questionService.updateQuestion(question1).subscribe({
              next: () => {
                this.questionService.emitQuestionAddedEvent();
                this.close();
                window.location.reload(); // Rafraîchir la page
              }
            });
          } else {
            console.log("There is a bad word here ****************");
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Your question contains prohibited words. Please revise your input.',
            });
          }
        });
      }
    );
  }

  
  ajouter() {
    const title = this.registerForm.value.title;
    const description = this.registerForm.value.description;
    const modulename = this.registerForm.value.module;
  
    this.questionService.getModuleId(modulename).subscribe(
      (data) => {
        this.moduleb = data; // Stockez l'ID du module dans la variable idModule
        console.log('Module ID:', this.moduleb); // Affichez l'ID du module dans la console (optionnel)
  
        // Create the combined object
        const question: QuestionForum = new QuestionForum();
        question.title = title;
        question.description = description;
        this.questionService.AddQuestion(this.idUser,question, this.moduleb.id).subscribe({
          next: () => {
            this.questionService.emitQuestionAddedEvent();
          }
        });
        this.close();
        
        // forkJoin({
        //   titleProfanity: this.checkProfanity(question.title),
        //   descriptionProfanity: this.checkProfanity(question.description)
        // }).subscribe(results => {
        //   if (results.titleProfanity == false && results.descriptionProfanity == false) {
        //     // Call the service method with the combinedObject and idModule
        //     this.questionService.AddQuestion(question, this.moduleb.id).subscribe({
        //       next: () => {
        //         this.questionService.emitQuestionAddedEvent();
        //       }
        //     });
        //     this.close();
        //   } else {
        //     // Call the service method with the combinedObject and idModule
        //     console.log("There is a bad word here ****************");
        //     Swal.fire({
        //       icon: 'error',
        //       title: 'Oops...',
        //       text: 'Your question contains prohibited words. Please revise your input.',
        //     });
        //   }
        // });
      },
      (error: any) => {
        console.error('Error fetching module ID:', error);
      }
    );   
  }
  // save(){
    
  // if(this.update==false){
  //   this.ajouter()
  // }
  // else
  // this.updatepop()

  // }

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
  
  isMessageValid = false;
  isMessageValid2= false;

  messageInput(event: any) {
    const title = event.target.value;
    const isWhitespace = (title || '').trim().length === 0;
  
    this.isMessageValid = !isWhitespace && title.length >= 5;
  }
  messageInput2(event: any) {
    const description = event.target.value;
    const isWhitespace = (description || '').trim().length === 0;
  
    this.isMessageValid2 = !isWhitespace && description.length >= 5;
  }

 
}
