import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Candidacy } from "src/app/Models/RecruitementEntities/Candidacy";
import { CandidancyService } from "src/app/Services/RecruitementServices/candidancy.service";

@Component({
  selector: "app-update-candidancy",
  templateUrl: "./update-candidancy.component.html",
  styleUrls: ["./update-candidancy.component.css"],
})
export class UpdateCandidancyComponent implements OnInit {
  id!: number;
  currentCandidancy: any;
  message = "";
  candidacy!: Candidacy;
  form: FormGroup = new FormGroup({
    description: new FormControl("", [Validators.required]),
    skills: new FormControl("", Validators.required),
    experience: new FormControl("", Validators.required),
    resume: new FormControl("", Validators.required),
  });

  constructor(
    private route: ActivatedRoute,
    private candidacyService: CandidancyService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.getcandidancy(this.route.snapshot.paramMap.get("id"));
  }
  getcandidancy(id: any) {
    this.candidacyService.get(id).subscribe(
      (data) => {
        this.currentCandidancy = data;
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  get f() {
    return this.form.controls;
  }
  updateCandidancy() {
    this.candidacyService
      .update(this.currentCandidancy.id, this.currentCandidancy)
      .subscribe(
        (response) => {
          console.log(response);
          this.message = "Candidacy updated successfully!";
        },
        (error) => {
          console.log(error);
        }
      );
  }

  submit() {
    console.log(this.form.value);
    this.candidacyService.update(this.id, this.form.value).subscribe((res) => {
      console.log("Candidacy updated successfully!");
      this.router.navigateByUrl("candidacy-list");
    });
  }
}
