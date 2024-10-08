import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course } from 'src/app/Models/AcademicProgramEntities/Course';
import { CourseserviceService } from 'src/app/Services/AcademicProgramServices/Course/courseservice.service';

@Component({
  selector: 'app-etcoursesymodule',
  templateUrl: './etcoursesymodule.component.html',
  styleUrls: ['./etcoursesymodule.component.css']
})
export class EtcoursesymoduleComponent {
  moduleId: string = ''; // Initialize as an empty string
  courses: Course[] = [];

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseserviceService
  ) { }

  ngOnInit(): void {
    // Subscribe to route parameter changes to get the moduleId
    this.route.params.subscribe(params => {
      this.moduleId = params['moduleId'];
      this.loadCourses();
    });
  }

  loadCourses(): void {
    this.courseService.getCoursesByModuleId(this.moduleId).subscribe(
      courses => {
        this.courses = courses;
      },
      error => {
        console.error('Error retrieving courses:', error);
      }
    );
  }
}