import { Component, EventEmitter, Input, Output } from '@angular/core';
import { QAnswer } from 'src/app/Models/EvaluationEntities/QAnswer';
import { QuestionTest } from 'src/app/Models/EvaluationEntities/QuestionTest';
import { Test } from 'src/app/Models/EvaluationEntities/Test';
import { QAnswerService } from 'src/app/Services/EvaluationServices/QAnswerServices/qanswer.service';
import { QuestionTestServiceService } from 'src/app/Services/EvaluationServices/QuestionTestServices/question-test-service.service';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent {
  @Input() questionIndex: number = 0;
  @Input() parentTest: Test = new Test();
  @Input() childQuestion: QuestionTest = new QuestionTest();


  @Input() testQuestions: any[] = [];
  @Output() testQuestionsChange = new EventEmitter<any[]>();




  
  newQuestion: QuestionTest = new QuestionTest();
  newAnswers: any[] = [
    { name: 'A', description: '' },
    { name: 'B', description: '' },
    { name: 'C', description: '' },
    { name: 'D', description: '' }
  ];
  correctAnswer: string = '';

  constructor(
    private questionTestService: QuestionTestServiceService,
    private qAnswerService: QAnswerService
  ) {}

  addQuestion() {
    // Check if parentTest is defined before accessing its properties
      this.newQuestion.answers = this.newAnswers;
      this.newQuestion.correctAnswer = this.correctAnswer;
      

      this.questionTestService.addQuestionTest(this.newQuestion).subscribe(
        (response) => {

          console.log('Question added successfully:', response);
          const assignedAnswers: QAnswer[] = [];

          for (let i = 0; i < this.newAnswers.length; i++) {
            const currentAnswer = this.newAnswers[i];
            assignedAnswers.push(currentAnswer);
          }

          
         // this.resetForm();
        },
        (error) => {
          console.error('Error adding question:', error);
        }
      );
  
  }

  addAnswer(index: number) {
    this.qAnswerService.addQAnswer(this.newAnswers[index]).subscribe(
      (response) => {
        console.log('Answer added successfully:', response);
        this.newAnswers[index] = response;
      },
      (error) => {
        console.error('Error adding answer:', error);
      }
    );
  }


  resetForm() {
    this.newQuestion = new QuestionTest();
    this.newAnswers = [
      { name: 'A', description: '' },
      { name: 'B', description: '' },
      { name: 'C', description: '' },
      { name: 'D', description: '' }
    ];
    this.correctAnswer = '';
  }
}
