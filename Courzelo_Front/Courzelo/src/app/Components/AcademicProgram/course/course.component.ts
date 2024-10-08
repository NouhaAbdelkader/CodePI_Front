import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Module } from 'src/app/Models/AcademicProgramEntities/Module';
import { CourseserviceService } from 'src/app/Services/AcademicProgramServices/Course/courseservice.service';
import { ModuleServiceService } from 'src/app/Services/AcademicProgramServices/Module/module-service.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent {
  courseForm: FormGroup;
  submitted = false;
  modules: Module[] = [];
 

  constructor(private ls: CourseserviceService, private moduleService: ModuleServiceService,private router: Router, private formBuilder: FormBuilder) {
    this.courseForm = this.formBuilder.group({
      name: ['', Validators.required],
      id: ['', Validators.required],
      description :['', Validators.required]
    });
  }

  ngOnInit() {
    this.getmodules();
    
  }

  getmodules() {
    this.moduleService.getAllmodule().subscribe(
      (data: any) => {
        // Assuming data is an array, you may want to add a check
        if (Array.isArray(data)) {
          this.modules = data;
        } else {
          console.error("Expected an array of modules, but received:", data);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
  
  
  saveCourse() {
    if (this.courseForm.invalid) {
      return;
    }
  
    // Assuming `this.classForm.value.level` contains the actual `levelId`
    const courseData = {
      name: this.courseForm.value.name,
      id: this.courseForm.value.id,
      description:this.courseForm.value.description,
    };
  
    this.ls.addcourse(courseData).subscribe(
      (response) => {
        console.log(response);
        this.submitted = true;
        // Move the navigation inside the subscription block
       // this.router.navigate(['/getallclasses']);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}  

