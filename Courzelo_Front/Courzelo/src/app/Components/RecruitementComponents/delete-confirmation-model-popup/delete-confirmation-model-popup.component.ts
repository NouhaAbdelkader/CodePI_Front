import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-delete-confirmation-model-popup",
  templateUrl: "./delete-confirmation-model-popup.component.html",
  styleUrls: ["./delete-confirmation-model-popup.component.css"],
})
export class DeleteConfirmationModelPopupComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteConfirmationModelPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {}

  confirmDelete(): void {
    this.dialogRef.close(true);
  }

  closeDialog(): void {
    this.dialogRef.close(false);
  }
}
