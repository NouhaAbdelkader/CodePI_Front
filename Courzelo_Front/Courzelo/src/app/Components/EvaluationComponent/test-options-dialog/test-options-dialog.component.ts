import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Module } from 'src/app/Models/AcademicProgramEntities/Module';
import { Test, TestType } from 'src/app/Models/EvaluationEntities/Test';

@Component({
  selector: 'app-test-options-dialog',
  templateUrl: './test-options-dialog.component.html',
  styleUrls: ['./test-options-dialog.component.css']
})
export class TestOptionsDialogComponent {
  quizTest: Test | undefined;
  finalTest: Test | undefined;
  testsAvailable: boolean = true; // Indique si des tests sont disponibles dans le module

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { module: Module },
    private router: Router,
    public dialogRef: MatDialogRef<TestOptionsDialogComponent>
  ) {
    console.log('Tests in the module:', data.module.tests);

    // Vérifier que data.module.tests existe avant d'essayer d'accéder à ses propriétés
    if (data.module.tests) {
      this.quizTest = data.module.tests.find(test => test.type === TestType.QuizTest);
      this.finalTest = data.module.tests.find(test => test.type === TestType.FinalTest);
    } else {
      // Si aucun test n'est disponible, indiquer qu'il n'y a pas de tests
      this.testsAvailable = false;
    }
  }

  takeQuizTest() {
    if (this.quizTest) {
      this.router.navigate(['/take-test'], {
        queryParams: { quizTestData: JSON.stringify(this.quizTest) }
      });
      this.dialogRef.close();
    }
  }

  takeFinalTest() {
    if (this.finalTest) {
      this.router.navigate(['/take-test'], {
        queryParams: { finalTestData: JSON.stringify(this.finalTest) }
      });
      this.dialogRef.close();
    } else {
      console.log('No Final Test found in the module.');
    }
  }

  closeDialog() {
    this.dialogRef.close(); // Fermer le dialogue
  }
  
}
