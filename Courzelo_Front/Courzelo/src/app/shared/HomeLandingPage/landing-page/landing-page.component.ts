import { Component } from '@angular/core';
import { Module } from 'src/app/Models/AcademicProgramEntities/Module';
import { ModuleServiceService } from 'src/app/Services/AcademicProgramServices/Module/module-service.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent {
  modules: Module[] = [];
  
  constructor(private moduleservice: ModuleServiceService) {}

  ngOnInit() {
    this.getAllmodules();
  }

  getAllmodules() {
    this.moduleservice.getAllmodule().subscribe(
      (data: Module[]) => {
        if (Array.isArray(data)) {
          this.modules = data;
          console.log(data);
        } else {
          console.error("Expected an array of modules, but received:", data);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
