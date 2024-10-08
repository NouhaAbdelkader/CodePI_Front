import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Class } from 'src/app/Models/AcademicProgramEntities/Class';
import { ClassServiceService } from 'src/app/Services/AcademicProgramServices/Class/class-service.service';
import { ModuleServiceService } from 'src/app/Services/AcademicProgramServices/Module/module-service.service';
import { GetallclassComponent } from '../../class/getallClass/getallclass/getallclass.component';

@Component({
  selector: 'app-updatemodule',
  templateUrl: './updatemodule.component.html',
  styleUrls: ['./updatemodule.component.css']
})
export class UpdatemoduleComponent implements OnInit{

  currentmodule: any;
  updatedmodule: any; 
  semestreValues = ['SEMESTER1', 'SEMESTER2']; 
  classes: Class[] = []; 


  constructor(
    private moduleService: ModuleServiceService,
    private classService: ClassServiceService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
 
  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.getmodule(id);

      this.classService.getAllclass().subscribe(
        (classes: Class[]) => {
          this.classes = classes;
        },
        (error: any) => {
          console.error('Error retrieving classes:', error);
        }
      );
    });
  }
   
  getmodule(id: any) {
    this.moduleService.getmodule(id).subscribe(
      (data) => {
        this.currentmodule = data;
        
        console.log('module retrieved:', data);
      },
      (error) => {
        console.error(error);
      }
    );
  }



  


  updatemodule(): void {
  
    this.moduleService.updateModule(this.currentmodule).subscribe(
      updatedmodule => {
        console.log('Module updated successfully:', updatedmodule);
        this.router.navigate(['/getallmodules']);
      },
      error => {
        console.error('Error updating module:', error);
      }
    );
  }
}

