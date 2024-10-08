import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Services/UserCorzeloServices/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup; // Initialize registerForm as a FormGroup

  // Define the list of roles
  roles: string[] = ['Admin', 'Teacher', 'Student', 'Moderator', 'Recruiter'];

  form: any = {
    username: null,
    email: null,
    password: null,
    roles: null
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService, private formBuilder: FormBuilder,private router:Router) { }

  ngOnInit(): void {
    // Initialize the registerForm FormGroup with form controls and validators
    this.registerForm = this.formBuilder.group({
      // Define your form controls and validation rules here
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      // Add more form controls as needed
    });
  }

  onSubmit(): void {
    const { username, email, password, roles } = this.form;

    this.authService.register(username, email, password, roles).subscribe({
      next: data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.router.navigate(['/login']);
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    });

    console.log("*********", roles)
  }
}
