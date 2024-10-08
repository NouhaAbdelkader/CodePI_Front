import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Module } from 'src/app/Models/AcademicProgramEntities/Module';
import { ProgramserviceService } from 'src/app/Services/AcademicProgramServices/Program/programservice.service';

@Component({
  selector: 'app-getproandaccessmodule',
  templateUrl: './getproandaccessmodule.component.html',
  styleUrls: ['./getproandaccessmodule.component.css']
})
export class GetproandaccessmoduleComponent {
  className = '';
  modulesSemester1: Module[] = [];
  modulesSemester2: Module[] = [];
  currentprog: Module[] = [];
  allModules: Module[] = [];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private programService: ProgramserviceService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.className = params['className'];
      this.loadModules(this.className);
    });
  }

  loadModules(className: string) {
    this.programService.getModulesByClass(className).subscribe(
      (data: Module[]) => {
        this.allModules = data;
        this.sortModulesBySemester();
        console.log('Modules retrieved:', data);
      },
      (error) => {
        console.error('Error retrieving modules:', error);
      }
    );
  }

  sortModulesBySemester() {
    // Sort modules by semester
    this.allModules.sort((a, b) => {
      if (a.semestre < b.semestre) return -1;
      if (a.semestre > b.semestre) return 1;
      return 0;
    });
  }

  // Function to navigate to the courses with the selected module
  goToCourses(module: Module) {
    // Assuming you have a route defined for the courses component with a parameter named 'moduleId'
    this.router.navigate(['/courses', { moduleId: module.id }]);
  }

}