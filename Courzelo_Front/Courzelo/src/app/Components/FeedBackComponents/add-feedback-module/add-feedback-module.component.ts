import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { TypeFeedback } from "src/app/Models/FeedBackEntitie/Feedback";
import { FeedbackService } from "src/app/Services/FeedBackServices/feedback.service";

@Component({
  selector: "app-add-feedback-module",
  templateUrl: "./add-feedback-module.component.html",
  styleUrls: ["./add-feedback-module.component.css"],
})
export class AddFeedbackModuleComponent implements OnInit {
  contactForm!: FormGroup;
  modules: string[] = ["Module A", "Module B", "Module C"]; // Define your list of modules here
  idUser!: string;
  roles: string[] = [];
  username!: string;
  constructor(
    private fb: FormBuilder,
    private feedbackService: FeedbackService
  ) {}

  ngOnInit() {
    this.contactForm = this.fb.group({
      description: ["", Validators.required],
      selectedModule: ["", Validators.required], // Add a form control for the selected module
      courseContent: ["", Validators.required],
    });
    let user = sessionStorage.getItem("auth-user");
    console.log("User from sessionStorage:", user);
    if (user) {
      let userData = JSON.parse(user);
      console.log("Parsed user data:", userData);
      this.idUser = userData.id;
      this.username = userData.username;
      this.roles = userData.roles;
      console.log("Roles:", this.roles);
      console.log("id nouha********************:", this.idUser);
    }
  }
  onSubmit() {
    if (this.contactForm.valid) {
      // Process form submission
      console.log(this.contactForm.value);
    } else {
      // Handle form validation errors
      alert("Please provide your feedback and select a module.");
    }
  }

  saveFeedback() {
    if (this.contactForm.valid) {
      // Initialize TypeFeedback entity with "Module"
      console.log(this.contactForm.value.CourseContent);
      const feedbackData = {
        ...this.contactForm.value,
        type: TypeFeedback.Module,
      };

      // Save feedback to the database
      this.feedbackService.create(feedbackData, this.idUser).subscribe(
        (response) => {
          console.log(response);
          alert("Feedback submitted successfully!");
        },
        (error) => {
          console.log(error);
          alert("An error occurred while submitting your feedback.");
        }
      );
    } else {
      // Handle form validation errors
      alert("Please provide your feedback and select a module.");
    }
  }
}
