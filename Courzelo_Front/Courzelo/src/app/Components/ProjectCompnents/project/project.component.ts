import { Component } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Difficulty, Project } from 'src/app/Models/ProjectEntities/Project';
import { Tasks } from 'src/app/Models/ProjectEntities/Tasks';
import { Speciality } from 'src/app/Models/UserCorzelo/UserCourzelo';
import { ProjetserviceService } from 'src/app/Services/ProjectServices/projetservice.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent {
  idUser!: string;
  roles:any ={} ;
  ngOnInit( ){
    let user = sessionStorage.getItem('auth-user');
    if (user) {
      let userData = JSON.parse(user);
      this.idUser = userData.id;
      //this.username = userData.username;
      this.roles = userData.roles;
   
    }
  }
  projectForm: FormGroup;
  submitted = false;
  difficultyValues = Object.values(Difficulty);
  project: Project = new Project(); // Instantiate a new Project object
  specialities: Speciality[] = this.project.specialities;
  tasks: Tasks[] = [];
  task: Tasks = new Tasks();
  constructor(private projectService: ProjetserviceService, private router: Router, private formBuilder: FormBuilder) {
    this.projectForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]],
      description: ['', [Validators.required, this.customValidator]],
      difficulty: ['', Validators.required],
      deadline: ['', Validators.required],
      datedebut: ['', Validators.required],
      specialities: ['', Validators.required],
      number : ['', Validators.required],
      taskName: ['']
    }, {
      validator: this.dateValidator('datedebut', 'deadline')
    });
  }

  addTask(): void {
    const taskName = this.f['taskName'].value.trim();
    if (taskName === '') {
      return;
    }
  
    // Create a new task object with the provided name
    const newTask: Tasks = new Tasks();
    newTask.name = taskName;
  
    // Push the new task to the tasks array
    this.tasks.push(newTask);
  
    // Clear the task name input field
    this.f['taskName'].setValue('');
  }
  customValidator(control: AbstractControl) {
    if (control.value && control.value.trim() === '') {
      return { 'required': true };
    }
    return null;
  }

  
  dateValidator(start: string, end: string) {
    return (group: FormGroup): {[key: string]: any} | null => { // Adjusted return type
      const startDate = group.controls[start];
      const endDate = group.controls[end];
      
      if (startDate.value && endDate.value && startDate.value > endDate.value) {
        return { dateMismatch: true };
      }
  
      return null;
    };
  }
  

  get f() {
    return this.projectForm.controls;
  }

  saveProject(): void {
    this.submitted = true;
    if (this.projectForm.invalid) {
      return;
    }

    // Assign form values to project object
    this.project['name'] = this.f['name'].value;
    this.project['description'] = this.f['description'].value;
    this.project['difficulty'] = this.f['difficulty'].value;
    this.project['datedebut'] = this.f['datedebut'].value;
    this.project['deadline'] = this.f['deadline'].value;
    this.project['specialities'] = this.f['specialities'].value; 
    this.project['number'] = this.f['number'].value; 
    this.project.tasks = this.tasks; 
    // Call service to add project
    this.projectService.addproject(this.project).subscribe(
      (response) => {
        console.log(response); // Handle successful response
        // Redirect or handle success scenario
        this.router.navigate(['/getallprojects']);
      },
      (error) => {
        console.error(error); // Handle error
      }
    );
  }

}