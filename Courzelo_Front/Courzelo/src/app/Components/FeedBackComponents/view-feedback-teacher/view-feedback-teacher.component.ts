import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import {
  Feedback,
  TypeFeedback,
} from "src/app/Models/FeedBackEntitie/Feedback";
import { FeedbackService } from "src/app/Services/FeedBackServices/feedback.service";

@Component({
  selector: "app-view-feedback-teacher",
  templateUrl: "./view-feedback-teacher.component.html",
  styleUrls: ["./view-feedback-teacher.component.css"],
})
export class ViewFeedbackTeacherComponent implements OnInit {
  feedbackTeacher: any;
  constructor(
    private feedbackTeacherService: FeedbackService,
    private router: Router
  ) {}

  ngOnInit() {
    this.feedbackTeacherService.getAll().subscribe(
      (data) => {
        this.feedbackTeacher = data;
        console.log(data);
        console.log(this.hasFeedbackTeacher());
      },
      (error) => {
        console.log(error);
      }
    );
  }
  addFeedbackTeacher() {
    this.router.navigate(["/addFeedbackTeacher"]);
  }
  hasFeedbackTeacher(): boolean {
    return (
      this.feedbackTeacher &&
      this.feedbackTeacher.length > 0 &&
      this.feedbackTeacher.some(
        (feedback: Feedback) => feedback.typeFeedback === TypeFeedback.Teacher
      )
    );
  }
}
