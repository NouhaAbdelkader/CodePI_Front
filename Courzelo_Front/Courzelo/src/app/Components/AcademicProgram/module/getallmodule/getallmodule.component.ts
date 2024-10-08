import { Component } from '@angular/core';
import { Module } from 'src/app/Models/AcademicProgramEntities/Module';
import { ClassServiceService } from 'src/app/Services/AcademicProgramServices/Class/class-service.service';
import { ModuleServiceService } from 'src/app/Services/AcademicProgramServices/Module/module-service.service';

@Component({
  selector: 'app-getallmodule',
  templateUrl: './getallmodule.component.html',
  styleUrls: ['./getallmodule.component.css']
})
export class GetallmoduleComponent {
  modules: Module[] = [];
  message ="";
  currentallmodules:any;
 
 

  constructor(private moduleservice: ModuleServiceService) { }

  ngOnInit() {
    this.getAllmodules();
  }

  getAllmodules() {
    this.moduleservice.getAllmodule().subscribe(
      (data: any) => {
        // Check if data is an array before assigning
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


updatemodule(module: Module): void {
    this.moduleservice.updateModule(module).subscribe(updatemodule => {
      // Handle the updated level as needed
      console.log('module updated:', updatemodule);
    });
  }

  deletemodule(ClassId: string): void {
    if (confirm("Are you sure you want to delete this module?")) {
      this.moduleservice.delete(ClassId).subscribe(
        () => {
          console.log('module deleted successfully');
          // Optionally, you can refresh the levels after deletion
          this.getAllmodules();
        },
        (error) => {
          console.error('Error deleting module:', error);
          // Handle error, display an error message, etc.
        }
      );
    }
  }
}


