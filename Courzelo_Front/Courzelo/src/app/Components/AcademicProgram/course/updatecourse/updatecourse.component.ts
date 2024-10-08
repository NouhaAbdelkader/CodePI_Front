import { Component } from '@angular/core';
import { CourseComponent } from '../course.component';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseserviceService } from 'src/app/Services/AcademicProgramServices/Course/courseservice.service';
import { Module } from 'src/app/Models/AcademicProgramEntities/Module';
import { ModuleServiceService } from 'src/app/Services/AcademicProgramServices/Module/module-service.service';

@Component({
  selector: 'app-updatecourse',
  templateUrl: './updatecourse.component.html',
  styleUrls: ['./updatecourse.component.css']
})
export class UpdatecourseComponent {
  message = '';
  currentcourse: any = {}
  updatedcourse: any; // Define the 'updatedLevel' property here
  module: Module[] = []; 
  constructor(
    private ls: CourseserviceService,
    private moduleservice: ModuleServiceService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.message = '';
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.getcourse(id);
       this.moduleservice.getAllmodule().subscribe(
      (module: Module[]) => { 
        this.module = module;
      },
      (error: any) => {
        console.error('Error retrieving modules:', error);
      }
    );
    });
  
  }
  
  getcourse(id: any) {
    this.ls.getcourse(id).subscribe(
      (data) => {
        this.currentcourse = data;
        console.log('course retrieved:', data);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  updatecourse(): void {
    if (this.currentcourse) {
      this.ls.updatedcourse(this.currentcourse).subscribe(updatedcourse => {
        // Handle the updated class as needed
        console.log('Course updated:', updatedcourse);
        
        // Navigate to the '/getallclourses' route after updating
        this.router.navigate(['/getallacourses']);
      });
    }
  }

}
