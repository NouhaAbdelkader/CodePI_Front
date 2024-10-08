import { Component } from '@angular/core';
import { Test } from 'src/app/Models/EvaluationEntities/Test';
import { TestServiceService } from 'src/app/Services/EvaluationServices/TestServices/test-service.service';
import { QuestionTest } from 'src/app/Models/EvaluationEntities/QuestionTest';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Module } from 'src/app/Models/AcademicProgramEntities/Module';
import { filter, map } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-test',
  templateUrl: './add-test.component.html',
  styleUrls: ['./add-test.component.css']
})
export class AddTestComponent {
  newTest: Test = new Test();
  testQuestions: QuestionTest[] = [];
  moduleId!: string; // Déclaration d'une variable pour stocker le moduleId
  idUser!: string;
  roles: string[] = [];
  username!:string
  constructor(
    private router: Router,
    private testService: TestServiceService,
     private activatedRoute: ActivatedRoute
  ) { {
    
  }
}
  ngOnInit(): void {

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
    // Écoutez les modifications des paramètres d'URL
    this.activatedRoute.params.subscribe(params => {
      this.moduleId = params['moduleId']; // Récupérez le moduleId à partir des paramètres d'URL
      console.log('Module Id:', this.moduleId);
    });
  }

  isGenerateButtonClicked = false;

  generateTestQuestions() {
    for (let i = 0; i < 10; i++) {
      this.addQuestion();
    }
    this.isGenerateButtonClicked = true;
  }

  addQuestion() {
    const question: QuestionTest = new QuestionTest();
    question.answers = [
      { name: 'A', description: '' },
      { name: 'B', description: '' },
      { name: 'C', description: '' },
      { name: 'D', description: '' }
    ];
    this.testQuestions.push(question);
  }

nameValid = true;
descriptionValid = true;
dateValid = true;
durationValid = true;
typeValid = true;
questionsValid = true;

saveTest() {
  if (!this.newTest.name || !this.newTest.description || !this.newTest.date || !this.newTest.duration || !this.newTest.type || this.testQuestions.length === 0) {
    // Définir les variables valid à false si les champs requis ne sont pas remplis
    this.nameValid = !!this.newTest.name;
    this.descriptionValid = !!this.newTest.description;
    this.dateValid = !!this.newTest.date;
    this.durationValid = !!this.newTest.duration;
    this.typeValid = !!this.newTest.type;
    this.questionsValid = this.testQuestions.length > 0;

    console.log('Veuillez remplir tous les champs et générer des questions avant de sauvegarder le test.');
    return;
}
  
  if (this.newTest.duration < 15) {
      this.durationValid = false;
  }

  console.log('Module Id:', this.moduleId);

    // Ajouter les questions au test
    this.newTest.questions = this.testQuestions;

    // Enregistrer le test dans la base de données
    this.testService.addTest(this.moduleId ,this.idUser , this.newTest).subscribe(
      (response) => {
        console.log('Test saved successfully:', response);
        this.resetForm();
      },
      (error) => {
        console.error('Error saving test:', error);
      }
    );
  }

  resetForm() {
    this.newTest = new Test();
    this.testQuestions = [];
  }

  showTests() {
    this.router.navigate(['/all-tests']);
  }

 

  
}
