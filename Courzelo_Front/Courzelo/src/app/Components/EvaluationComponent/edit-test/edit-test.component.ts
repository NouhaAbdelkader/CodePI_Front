import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Test } from 'src/app/Models/EvaluationEntities/Test';
import { TestServiceService } from 'src/app/Services/EvaluationServices/TestServices/test-service.service';

@Component({
  selector: 'app-edit-test',
  templateUrl: './edit-test.component.html',
  styleUrls: ['./edit-test.component.css']
})
export class EditTestComponent {
  constructor(
    public dialogRef: MatDialogRef<EditTestComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Test,
    private testService: TestServiceService
  ) {}

  editTest() {
    this.testService.updateTest(this.data).subscribe(
      (updatedTest) => {
        // Handle successful edit, e.g., update the local tests array
        this.dialogRef.close(updatedTest); // Close the dialog with the updated test
      },
      (error) => {
        console.error('Error editing test:', error);
      }
    );
  }

  closeDialog() {
    this.dialogRef.close(); // Close the dialog without saving changes
  }
}
