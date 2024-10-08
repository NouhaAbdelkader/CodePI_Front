import { Component, OnInit } from "@angular/core";
import { JobOfferService } from "src/app/Services/RecruitementServices/job-offer.service";

@Component({
  selector: "app-addjob-offer",
  templateUrl: "./addjob-offer.component.html",
  styleUrls: ["./addjob-offer.component.css"],
})
export class AddjobOfferComponent implements OnInit {
  JobOffer = {
    title: "",
    description: "",
    skills: "",
    speciality: "",
    experience: "",
  };
  submitted = false;
  idUser!: string;
  roles: string[] = [];
  username!: string;

  constructor(private jobOfferService: JobOfferService) {}

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
    console.log("Form Submitted!");
  }
  saveJobOffer() {
    const data = {
      title: this.JobOffer.title,
      description: this.JobOffer.description,
      skills: this.JobOffer.skills,
      speciality: this.JobOffer.speciality,
      experience: this.JobOffer.experience,
    };

    this.jobOfferService.create(data, this.idUser).subscribe(
      (response) => {
        console.log(response);
        this.submitted = true;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  newJobOffer() {
    this.submitted = false;
    this.JobOffer = {
      title: "",
      description: "",
      skills: "",
      speciality: "",
      experience: "",
    };
  }
}
