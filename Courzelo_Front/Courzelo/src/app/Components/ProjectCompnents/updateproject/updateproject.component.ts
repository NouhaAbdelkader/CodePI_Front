import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Difficulty } from 'src/app/Models/ProjectEntities/Project';
import { ProjetserviceService } from 'src/app/Services/ProjectServices/projetservice.service';

@Component({
  selector: 'app-updateproject',
  templateUrl: './updateproject.component.html',
  styleUrls: ['./updateproject.component.css']
})
export class UpdateprojectComponent {
  updatedProject: any; // Define variable to hold updated project data
  difficultyValues = Object.values(Difficulty);
  constructor(
    public dialogRef: MatDialogRef<UpdateprojectComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private projectService: ProjetserviceService
  ) {
    // Initialize updatedProject with current project data
    this.updatedProject = { ...data };
  }

  updateProject(): void {
    // Call your project service method to update the project
    this.projectService.updateproject(this.updatedProject).subscribe(
      () => {
        console.log('Project updated successfully.');
        this.dialogRef.close('updated'); // Close dialog with success status
      },
      error => {
        console.error('Error updating project:', error);
        // Handle error as needed
      }
    );
  }

  // Optional: Add any additional methods needed for updating project
}