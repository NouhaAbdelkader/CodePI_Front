import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-project-details-component',
  templateUrl: './project-details-component.component.html',
  styleUrls: ['./project-details-component.component.css']
})
export class ProjectDetailsComponentComponent {
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,public dialogRef: MatDialogRef<ProjectDetailsComponentComponent>) {}
  closeDialog() {
    this.dialogRef.close();
  }
}
