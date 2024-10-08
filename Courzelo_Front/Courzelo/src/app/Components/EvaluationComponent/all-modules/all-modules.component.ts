import { Component, OnInit } from '@angular/core';
import { EvaluationService } from 'src/app/Services/EvaluationServices/evalServices/evaluation.service';
import { Module } from 'src/app/Models/AcademicProgramEntities/Module';
import { MatDialog } from '@angular/material/dialog';
import { TestOptionsDialogComponent } from '../test-options-dialog/test-options-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-modules',
  templateUrl: './all-modules.component.html',
  styleUrls: ['./all-modules.component.css']
})
export class AllModulesComponent implements OnInit {
  modules: Module[] = [];

  constructor(private router: Router,private evaluationService: EvaluationService ,  public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadModules();
  }

  loadModules(): void {
    this.evaluationService.getAllModules().subscribe(
      (data: Module[]) => {
        this.modules = data;
      },
      (error) => {
        console.error('Error fetching modules: ', error);
      }
    );
  }

  openTestOptionsDialog(module: Module): void {
    console.log('Open Test Options Dialog method called!');
    
    const dialogRef = this.dialog.open(TestOptionsDialogComponent, {
       
         // Adjust the height as needed
        data: { module: module }, // Pass the module data as input to the dialog
        
        // The transform option can be used to move the dialog back to center.
        panelClass: 'dialog-center',
    });

    // Handle dialog close event if needed
    dialogRef.afterClosed().subscribe(result => {
        console.log('Test Options Dialog closed.');
        // Perform any necessary actions when the dialog is closed
        // For example, refresh data, handle user responses, etc.
    });
}


  navigateToTakeTest(module: Module, testType: string): void {
    this.router.navigate(['/take-test', { moduleId: module.id, type: testType }]);
  }

  navigateToAddTest(module: Module): void {
    this.router.navigate(['/add-test', { moduleId: module.id}]);
  }
}
