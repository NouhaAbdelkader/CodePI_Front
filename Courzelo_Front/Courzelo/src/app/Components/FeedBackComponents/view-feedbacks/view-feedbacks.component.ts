import { Component, OnInit } from "@angular/core";
import { Feedback } from "src/app/Models/FeedBackEntitie/Feedback";
import { EmailServiceService } from "src/app/Services/FeedBackServices/email-service.service";
import { FeedbackService } from "src/app/Services/FeedBackServices/feedback.service";
declare var Morris: any;
@Component({
  selector: "app-view-feedbacks",
  templateUrl: "./view-feedbacks.component.html",
  styleUrls: ["./view-feedbacks.component.css"],
})
export class ViewFeedbacksComponent implements OnInit {
  feedbackList: any;
  moduleFeedback: any;
  teacherFeedback: any;
  chartData: any;
  feedbackformail: any;

  constructor(
    private feedbackService: FeedbackService,
    private emailService: EmailServiceService
  ) {}

  ngOnInit() {
    this.fetchFeedbacks();
  }

  fetchFeedbacks() {
    this.feedbackService.getAll().subscribe(
      (response) => {
        this.feedbackList = response;
        this.groupbFeedbackByType();
        this.rendergraph();
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  groupbFeedbackByType() {
    this.moduleFeedback = this.feedbackList.filter(
      (feedback: Feedback) => feedback.typeFeedback.toString() == "Module"
    );
    this.teacherFeedback = this.feedbackList.filter(
      (feedback: Feedback) => feedback.typeFeedback.toString() === "Teacher"
    );

    // count
    const modulefeedbackCount = this.moduleFeedback.length;
    const teacherfeedbackCount = this.teacherFeedback.length;

    this.chartData = [
      { label: "Module", value: modulefeedbackCount },
      { label: "Teacher", value: teacherfeedbackCount },
    ];
  }
  rendergraph() {
    new Morris.Donut({
      element: "morris-donut-example",
      data: this.chartData,
      labels: ["value"],
      onClick: (i: any, row: any) => {
        if (row.labels == "Teacher") {
          this.sendEmailToTeacher();
        }
      },
    });
  }
  sendEmailToTeacher() {
    this.feedbackService.getAll().subscribe(
      (data) => {
        this.feedbackformail = data;
        console.log(this.feedbackformail); // Make sure data is available here
        const highSatisfactionFeedbacks = this.feedbackformail.filter(
          (feedback: Feedback) =>
            feedback.CourseContent >= 4 ||
            feedback.typeFeedback.toString() == "Teacher"
        );
        const highSatisfactionCount = highSatisfactionFeedbacks.length;
        if (highSatisfactionCount >= 3) {
          highSatisfactionFeedbacks.forEach((feedback: Feedback) => {
            this.sendEmail(
              feedback.teacher.email,
              "High satisfaction feedback",
              "you have high satisfaction feedback"
            );
          });
        } else {
          this.teacherFeedback.forEach((feedback: Feedback) => {
            this.sendEmail(
              feedback.teacher.email,
              "Low satisfaction feedback",
              "you have low satisfaction feedback"
            );
          });
        }
      },
      (error) => {
        console.log("An error occurred while fetching feedbacks", error);
      }
    );
  }

  sendEmail(recipient: string, subject: string, message: string) {
    this.emailService.sendEmail(recipient, subject, message).subscribe(
      (response) => {
        console.log("Email sent successfully", response);
      },
      (error) => {
        console.log("An error occurred while sending the email", error);
      }
    );
  }
}
