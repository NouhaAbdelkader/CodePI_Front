import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import {
  Feedback,
  TypeFeedback,
} from "src/app/Models/FeedBackEntitie/Feedback";
import { FeedbackService } from "src/app/Services/FeedBackServices/feedback.service";

@Component({
  selector: "app-view-feedback-module",
  templateUrl: "./view-feedback-module.component.html",
  styleUrls: ["./view-feedback-module.component.css"],
})
export class ViewFeedbackModuleComponent implements OnInit {
  feedbackModules: any;
  constructor(
    private feedbackModuleService: FeedbackService,
    private router: Router
  ) {}

  ngOnInit() {
    this.feedbackModuleService.getAll().subscribe(
      (data) => {
        this.feedbackModules = data;
        console.log(data);
        console.log(this.hasFeedbackModules());
      },
      (error) => {
        console.log(error);
      }
    );
  }

  addFeedbackModule() {
    this.router.navigate(["/addFeedbackModule"]);
  }
  hasFeedbackModules(): boolean {
    return (
      this.feedbackModules &&
      this.feedbackModules.length > 0 &&
      this.feedbackModules.some(
        (feedback: Feedback) => feedback.typeFeedback.toString() == "Module"
      )
    );
  }
}
