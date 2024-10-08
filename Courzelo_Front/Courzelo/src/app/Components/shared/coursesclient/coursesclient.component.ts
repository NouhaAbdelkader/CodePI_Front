import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course } from 'src/app/Models/AcademicProgramEntities/Course';
import { CourseserviceService } from 'src/app/Services/AcademicProgramServices/Course/courseservice.service';

@Component({
  selector: 'app-coursesclient',
  templateUrl: './coursesclient.component.html',
  styleUrls: ['./coursesclient.component.css']
})
export class CoursesclientComponent {
  moduleId: string = '';
  courses: Course[] = [];

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseserviceService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.moduleId = params['moduleId'];
      this.loadCourses();
    });
  }

  loadCourses(): void {
    this.courseService.getCoursesByModuleId(this.moduleId).subscribe(
      courses => {
        this.courses = courses;
        console.log('Courses:', this.courses); // Log the fetched courses
      },
      error => {
        console.error('Error retrieving courses:', error);
      }
    );
  }
}


