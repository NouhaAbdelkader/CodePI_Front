import { EvaluationService } from "src/app/Services/EvaluationServices/evalServices/evaluation.service";
import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { Test, TestType } from "src/app/Models/EvaluationEntities/Test";
import { TestServiceService } from "src/app/Services/EvaluationServices/TestServices/test-service.service";
import { Router } from "@angular/router";
import { HttpErrorResponse } from "@angular/common/http";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute } from "@angular/router";
import { QuestionTest } from "src/app/Models/EvaluationEntities/QuestionTest";
import { Evaluation } from "src/app/Models/EvaluationEntities/Evaluation";
import { Time } from "@angular/common";
import { UserCourzelo } from "src/app/Models/UserCorzelo/UserCourzelo";

@Component({
  selector: "app-take-test",
  templateUrl: "./take-test.component.html",
  styleUrls: ["./take-test.component.css"],
})
export class TakeTestComponent implements OnInit {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private evaluationService: EvaluationService
  ) {}
  questions: QuestionTest[] = [];
  selectedAnswers: { [key: string]: string } = {};
  testId!: string;
  date!: Date;
  duration!: number;
  type!: TestType;
  EvaluationData!: Evaluation;
  timerInterval: any;
  timeLeft!: number;
  teacher!: UserCourzelo;
  // studentName: string = "Nouha abdelkader";
  idUser!: string;
  roles: string[] = [];
  username!: string;
  ngOnInit(): void {
    //
    let user = sessionStorage.getItem("auth-user");
    console.log("User from sessionStorage:", user);
    if (user) {
      let userData = JSON.parse(user);
      console.log("Parsed user data:", userData);
      this.idUser = userData.id;
      this.username = userData.username;
      this.roles = userData.roles;
      console.log("Roles:", this.roles);
    }
    //

    this.activatedRoute.queryParams.subscribe((params) => {
      const quizTestData = params["quizTestData"];
      const finalTestData = params["finalTestData"];

      if (quizTestData) {
        // Convertir la chaîne JSON en objet pour le test de quiz
        const quizTest = JSON.parse(quizTestData);
        this.questions = quizTest.questions;
        this.testId = quizTest.id;
        this.date = quizTest.date;
        this.duration = quizTest.duration;
        this.type = quizTest.type;
        this.teacher = quizTest.teacher;
        console.log("Quiz Test data in TakeTestComponent:", this.testId);
        // Utiliser les données du test de quiz comme nécessaire
      }

      if (finalTestData) {
        // Convertir la chaîne JSON en objet pour le test final
        const finalTest = JSON.parse(finalTestData);
        this.questions = finalTest.questions;
        this.testId = finalTest.id;
        this.date = finalTest.date;
        this.duration = finalTest.duration;
        this.type = finalTest.type;
        this.teacher = finalTest.teacher;
        console.log("Final Test data in TakeTestComponent:", finalTest);
        // Utiliser les données du test final comme nécessaire
      }
    });
    this.timeLeft = this.duration * 60;
    console.log(this.timeLeft);
    this.startTimer();
  }

  cancelSelection(): void {
    const inputs =
      document.querySelectorAll<HTMLInputElement>("input[type=radio]");
    inputs.forEach((input) => {
      input.checked = false;
    });
  }

  selectAnswer(answerName: string, answer: string): void {
    this.selectedAnswers[answerName] = answer;
  }

  submitTest(): void {
    console.log("selected answers??:", this.selectedAnswers);
    const studentId = this.idUser; // Remplacez par la logique pour obtenir l'ID de l'étudiant

    if (Object.keys(this.selectedAnswers).length === this.questions.length) {
      this.evaluationService
        .takeTest(this.testId, studentId, this.selectedAnswers)
        .subscribe(
          (result) => {
            console.log("Test submitted successfully:", result);
          },
          (error) => {
            console.error("Error submitting test:", error);
          }
        );
    } else {
      console.error("Please answer all questions before submitting.");
    }

    this.router.navigate(["grades"]);
  }

  // Convertir la durée en minutes en secondes

  startTimer(): void {
    this.timerInterval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--; // Décrémentation du temps restant
      } else {
        clearInterval(this.timerInterval); // Arrêter le timer lorsque le temps est écoulé
        this.submitTest();

        this.router.navigate(["grades"]);
        // Soumettre automatiquement le test lorsque le temps est écoulé
      }
    }, 1000); // Décompte toutes les secondes
  }

  formatTimeLeft(): string {
    const minutes = Math.floor(this.timeLeft / 60);
    const seconds = this.timeLeft % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  }

  questionsWithNoAnswer(): boolean {
    for (const q of this.questions) {
      if (!this.selectedAnswers[q.id]) {
        return true; // S'il y a une question sans réponse, retourne true
      }
    }
    return false; // Sinon, retourne false
  }
}
