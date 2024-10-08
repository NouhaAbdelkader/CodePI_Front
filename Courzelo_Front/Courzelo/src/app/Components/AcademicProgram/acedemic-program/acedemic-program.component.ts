import { Component} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Module } from 'src/app/Models/AcademicProgramEntities/Module';
import { Semestre } from 'src/app/Models/AcademicProgramEntities/Semestre';
import { ProgramserviceService } from 'src/app/Services/AcademicProgramServices/Program/programservice.service';

@Component({
  selector: 'app-acedemic-program',
  templateUrl: './acedemic-program.component.html',
  styleUrls: ['./acedemic-program.component.css']
})
export class AcedemicProgramComponent  {

  className = '';
  modulesSemester1: Module[] = [];
  modulesSemester2: Module[] = [];
  currentprog: Module[] = [];
  allModules: Module[] = [];
  constructor(
    private route: ActivatedRoute,
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

}
