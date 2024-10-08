import { Component, OnInit } from "@angular/core";
import { TypeOption } from "src/app/Models/FeedBackEntitie/QuestionFeedBack";
import { QuestionfeedbackService } from "src/app/Services/FeedBackServices/questionfeedback.service";

@Component({
  selector: "app-add-question-feedback",
  templateUrl: "./add-question-feedback.component.html",
  styleUrls: ["./add-question-feedback.component.css"],
})
export class AddQuestionFeedbackComponent implements OnInit {
  QuestionFeedback = {
    description: "",
    option: TypeOption, // Set option to null initially
  };
  optionKeys: string[] = [];
  TypeOptionEnum = TypeOption; // Assign TypeOption directly

  submitted = false;

  constructor(private questionfeedbackservice: QuestionfeedbackService) {}

  ngOnInit() {
    this.optionKeys = Object.keys(TypeOption).filter((key) =>
      isNaN(Number(key))
    );
  }

  onSubmit() {
    console.log("Form Submitted!");
  }

  saveQuestionFeedback() {
    const data = {
      description: this.QuestionFeedback.description,
      option: this.QuestionFeedback.option,
    };

    this.questionfeedbackservice.create(data).subscribe(
      (response) => {
        console.log(response);
        this.submitted = true;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  newQuestionFeedback() {
    this.submitted = false;
    this.QuestionFeedback = {
      description: "",
      option: null, // Reset option to null
    };
  }
}
