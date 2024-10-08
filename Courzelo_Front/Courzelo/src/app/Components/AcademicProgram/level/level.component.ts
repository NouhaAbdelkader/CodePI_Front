import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LevelServiceService } from 'src/app/Services/AcademicProgramServices/Level/level-service.service';


@Component({
  selector: 'app-level',
  templateUrl: './level.component.html',
  styleUrls: ['./level.component.css']
})
export class LevelComponent implements OnInit {
  levelForm: FormGroup;
  submitted = false;

  constructor(private ls: LevelServiceService, private router: Router, private formBuilder: FormBuilder) {
    this.levelForm = this.formBuilder.group({
      name: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  saveLevel() {
    if (this.levelForm.invalid) {
      return;
    }

    this.ls.addlevel(this.levelForm.value).subscribe(
      (response) => {
        console.log(response);
        this.submitted = true;
        this.router.navigate(['/getalllevels']);
      },
      (error) => {
        console.log(error);
      }
    );
  }



}

