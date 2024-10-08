import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { JobOfferService } from "src/app/Services/RecruitementServices/job-offer.service";

@Component({
  selector: "app-updatejob-offer",
  templateUrl: "./updatejob-offer.component.html",
  styleUrls: ["./updatejob-offer.component.css"],
})
export class UpdatejobOfferComponent implements OnInit {
  currentJobOffer: any;
  message = "";
  constructor(
    private jobOfferservice: JobOfferService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.message = "";
    this.getJobOffer(this.route.snapshot.paramMap.get("id"));
  }
  getJobOffer(id: any) {
    this.jobOfferservice.get(id).subscribe(
      (data) => {
        this.currentJobOffer = data;
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  updateJobOffer() {
    this.jobOfferservice
      .update(this.currentJobOffer.id, this.currentJobOffer)
      .subscribe(
        (response) => {
          console.log(response);
          this.message = "The job offer was updated successfully!";
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
