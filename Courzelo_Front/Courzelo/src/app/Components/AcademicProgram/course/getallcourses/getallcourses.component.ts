import { Component } from '@angular/core';
import { Course } from 'src/app/Models/AcademicProgramEntities/Course';
import { Filecalss } from 'src/app/Models/AcademicProgramEntities/Filecalss';
import { Module } from 'src/app/Models/AcademicProgramEntities/Module';
import { CourseserviceService } from 'src/app/Services/AcademicProgramServices/Course/courseservice.service';
import { FileclassserviceService } from 'src/app/Services/AcademicProgramServices/Course/fileclassservice.service';

@Component({
  selector: 'app-getallcourses',
  templateUrl: './getallcourses.component.html',
  styleUrls: ['./getallcourses.component.css']
})
export class GetallcoursesComponent {

  courses: Course[] = [];
  message ="";
  currentCourse:any;

 

  constructor(private courseService: CourseserviceService) { }

  
  ngOnInit() {
    this. getAllCourses();
   
  }

  getAllCourses() {
    this.courseService.getAllcourses().subscribe(
      (data: any) => {
        // Check if data is an array before assigning
        if (Array.isArray(data)) {
          this.courses = data;
          console.log(data);
        } else {
          console.error("Expected an array of Courses, but received:", data);
        }
      },
      (error) => {
        console.log(error);
      }
    );

  }


updatecourse(course: Course): void {

  
    this.courseService.updatedcourse(course).subscribe(updatecourse => {
      // Handle the updated course as needed
      console.log('course updated:', updatecourse);
    });
  }

  deletecourse(ClassId: string): void {
    if (confirm("Are you sure you want to delete this course?")) {
      this.courseService.delete(ClassId).subscribe(
        () => {
          console.log('class deleted successfully');
          // Optionally, you can refresh the levels after deletion
          this.getAllCourses();
        },
        (error) => {
          console.error('Error deleting course:', error);
          // Handle error, display an error message, etc.
        }
      );
    }
  }
}