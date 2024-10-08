import { Component } from '@angular/core';
import { Class } from 'src/app/Models/AcademicProgramEntities/Class';
import { ClassServiceService } from 'src/app/Services/AcademicProgramServices/Class/class-service.service';

@Component({
  selector: 'app-getallclass',
  templateUrl: './getallclass.component.html',
  styleUrls: ['./getallclass.component.css']
})
export class GetallclassComponent {
  Classes: Class[] = [];
  message ="";
  currentClass:any;
 
  

  constructor(private classService: ClassServiceService) { }

  ngOnInit() {
    this.getAllClasses();
   
  }

  getAllClasses() {
    this.classService.getAllclass().subscribe(
      (data: any) => {
        // Check if data is an array before assigning
        if (Array.isArray(data)) {
          this.Classes = data;
          console.log(data);
        } else {
          console.error("Expected an array of classes, but received:", data);
        }
      },
      (error) => {
        console.log(error);
      }
    );

  }


updateclass(Class: Class): void {

  
    this.classService.updatedclass(Class).subscribe(updateclass => {
      // Handle the updated level as needed
      console.log('Level updated:', updateclass);
    });
  }

  deleteclass(ClassId: string): void {
    if (confirm("Are you sure you want to delete this Class?")) {
      this.classService.delete(ClassId).subscribe(
        () => {
          console.log('class deleted successfully');
          // Optionally, you can refresh the levels after deletion
          this.getAllClasses();
        },
        (error) => {
          console.error('Error deleting class:', error);
          // Handle error, display an error message, etc.
        }
      );
    }
  }
}
