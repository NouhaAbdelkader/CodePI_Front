import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Class } from 'src/app/Models/AcademicProgramEntities/Class';
import { ClassServiceService } from 'src/app/Services/AcademicProgramServices/Class/class-service.service';
import { ModuleServiceService } from 'src/app/Services/AcademicProgramServices/Module/module-service.service';

@Component({
  selector: 'app-module',
  templateUrl: './module.component.html',
  styleUrls: ['./module.component.css']
})
export class ModuleComponent {
 public moduleForm! :FormGroup;
  submitted = false;
  semestreValues = ["SEMESTER1", "SEMESTER2"];
  classes: Class[] = [];

  constructor(
    private moduleService: ModuleServiceService,
    private classService: ClassServiceService,
    private formBuilder: FormBuilder,
    private router:Router,
    
  ) {
  
  }

  ngOnInit() {

    this.moduleForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      nbHeurePerWeek: ['', Validators.required],
      nbHeureTotal: ['', Validators.required],
      couef: ['', Validators.required],
      semestre: ['', Validators.required],
      classes: [[], Validators.required] // Assuming classes is a multi-select
    });
    this.getClasses();
  }

  getClasses() {
    this.classService.getAllclass().subscribe(
      (data: any) => {
        this.classes = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  saveModule() {
    if (this.moduleForm.invalid) {
      return;
    }

    this.moduleService.addModule(this.moduleForm.value).subscribe(
      (response) => {
        console.log(response);
        this.submitted = true;
         this.router.navigate(['/getallmodules']);
      },
      (error) => {
        console.log(error);
        this.router.navigate(['/getallmodules']);
      }
    );
    this.router.navigate(['/getallmodules']);
  }
}