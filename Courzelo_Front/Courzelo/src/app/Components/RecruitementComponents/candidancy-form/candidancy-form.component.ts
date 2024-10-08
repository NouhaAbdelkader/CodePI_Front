import { Component, Inject } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ActivatedRoute } from "@angular/router";
import { Candidacy } from "src/app/Models/RecruitementEntities/Candidacy";
import { CandidancyService } from "src/app/Services/RecruitementServices/candidancy.service";

@Component({
  selector: "app-candidancy-form",
  templateUrl: "./candidancy-form.component.html",
  styleUrls: ["./candidancy-form.component.css"],
})
export class CandidancyFormComponent {
  submitted = false;
  jobId: any;
  candidacyForm = new FormGroup({
    description: new FormControl("", Validators.required),
    skills: new FormControl("", Validators.required),
    experience: new FormControl("", Validators.required),
    resume: new FormControl("", Validators.required),
  });
  idUser!: string;
  roles: string[] = [];
  username!: string;

  constructor(
    private candidacyService: CandidancyService,
    private route: ActivatedRoute
  ) {
    this.jobId = this.route.snapshot.paramMap.get("jobId");
  }

  ngOnInit() {
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
    if (this.candidacyForm.valid) {
      const candidacy = this.candidacyForm.value;
      this.candidacyService
        .createCandidancy(candidacy, this.jobId, this.idUser)
        .subscribe((response) => {
          console.log(response);
        });
    }
  }
}
