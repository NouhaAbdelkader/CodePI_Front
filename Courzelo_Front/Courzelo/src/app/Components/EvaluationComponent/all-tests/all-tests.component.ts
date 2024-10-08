// all-tests.component.ts
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Test } from 'src/app/Models/EvaluationEntities/Test';
import { TestServiceService } from 'src/app/Services/EvaluationServices/TestServices/test-service.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import {  EditTestComponent} from 'src/app/Components/EvaluationComponent/edit-test/edit-test.component';
import { Evaluation } from 'src/app/Models/EvaluationEntities/Evaluation';
import { EvaluationService } from 'src/app/Services/EvaluationServices/evalServices/evaluation.service';

@Component({
    selector: 'app-all-tests',
    templateUrl: './all-tests.component.html',
    styleUrls: ['./all-tests.component.css'],
})
export class AllTestsComponent implements OnInit {
  tests: Test[] = [];
  displayedTests: Test[] = [];
  finalevaluations! : Evaluation[] 

  searchText: string = '';
  selectedSortOption: any;
    constructor(
        private testService: TestServiceService,
        private cdr: ChangeDetectorRef,
        private router: Router, 
        private dialog: MatDialog,
        private evaluationService: EvaluationService
    ) {}

    ngOnInit(): void {
        this.loadAllTests();
    }

    loadAllTests() {
        this.testService.getAllTests().subscribe(
            (data) => {
                this.tests = data;
                this.cdr.detectChanges(); // Trigger change detection
            },
            (error) => {
                console.error('Error loading tests:', error);
            }
        );
    }

    editTest(test: Test) {
        this.testService.updateTest(test).subscribe(
            (updatedTest) => {
                const index = this.tests.findIndex(t => t.id === updatedTest.id);
                if (index !== -1) {
                    this.tests[index] = updatedTest;
                    this.cdr.detectChanges();
                }
            },
            (error) => {
                console.error('Error editing test:', error);
            }
        );
    }

    deleteTest(test: Test) {
      const shouldDelete = window.confirm('Are you sure you want to delete this test?');
      if (shouldDelete) {
          this.testService.deleteTest(test.id).subscribe(
              () => {
                  // If the observable completes without errors, assume the operation was successful
                  this.tests = this.tests.filter((t) => t.id !== test.id);
              },
              (error) => {
                  if (error instanceof ErrorEvent) {
                      console.error('An error occurred:', error.error.message);
                  } else {
                      console.error(`Error deleting test: ${error.statusText}`);
                  }
              }
          );
      }
  }
  
  openEditDialog(test: Test): void {
    const dialogRef = this.dialog.open(EditTestComponent, {
      width: '400px',
      data: test,
    });

    dialogRef.afterClosed().subscribe(result => {
      // Handle the result if needed
    });
  }
  sortTests() {
    console.log('zaam?:', this.selectedSortOption);
    // Utilisez la méthode retrieveTestsSortedByAttributeAndValue du service
    this.testService.retrieveTestsSortedByAttributeAndValue(this.selectedSortOption, this.searchText).subscribe(
        (sortedTests) => {
            this.displayedTests = sortedTests;
            this.tests = this.displayedTests; // Remplacer les tests par les tests affichés
            this.cdr.detectChanges(); // Déclencher la détection des changements
        },
        (error) => {
            console.error('Error sorting tests:', error);
        }
    );
    console.log('text:', this.displayedTests);
}



  
 
  navigateToAddTest() {
    this.router.navigate(['/add-test']); // Adjust the route path based on your configuration
  }
  

  calculFinals(): void {
    this.evaluationService.calculfinals().subscribe(
      (data: Evaluation[]) => {

        // Stockez l'évaluation finale de l'étudiant dans `finalEvaluation`
        this.finalevaluations = data;
        // Maintenant, vous pouvez utiliser `finalEvaluation` dans votre template HTML pour afficher les informations
      },
      (error) => {
        console.error('Error fetching final grade: ', error);
        // Vous pouvez ajouter une logique pour gérer l'erreur, par exemple afficher un message à l'utilisateur
      }
    );
  }
  
}
