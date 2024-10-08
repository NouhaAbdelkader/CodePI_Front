import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Class } from 'src/app/Models/AcademicProgramEntities/Class';
import { Level } from 'src/app/Models/AcademicProgramEntities/Level';
import { ClassServiceService } from 'src/app/Services/AcademicProgramServices/Class/class-service.service';
import { LevelServiceService } from 'src/app/Services/AcademicProgramServices/Level/level-service.service';

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.css']
})
export class ClassComponent implements OnInit{
  classForm: FormGroup;
  submitted = false;
  levels: Level[] = [];
 

  constructor(private ls: ClassServiceService, private levelService: LevelServiceService,private router: Router, private formBuilder: FormBuilder) {
    this.classForm = this.formBuilder.group({
      name: ['', Validators.required],
      id: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.getLevels();
    
  }

  getLevels() {
    this.levelService.getAlllevel().subscribe(
      (data: any) => {
        // Assuming data is an array, you may want to add a check
        if (Array.isArray(data)) {
          this.levels = data;
        } else {
          console.error("Expected an array of levels, but received:", data);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
  
  
  saveClass() {
    if (this.classForm.invalid) {
      return;
    }
  
    // Assuming `this.classForm.value.level` contains the actual `levelId`
    const classData = {
      name: this.classForm.value.name,
       id: this.classForm.value.id
    };
  
    this.ls.addclass(classData).subscribe(
      (response) => {
        console.log(response);
        this.submitted = true;
        // Move the navigation inside the subscription block
        this.router.navigate(['/getallclasses']);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}  