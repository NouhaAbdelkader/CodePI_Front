import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { JobOfferService } from "src/app/Services/RecruitementServices/job-offer.service";
import { DeleteConfirmationModelPopupComponent } from "../delete-confirmation-model-popup/delete-confirmation-model-popup.component";
import { CandidancyService } from "src/app/Services/RecruitementServices/candidancy.service";
import { CandidancyFormComponent } from "../candidancy-form/candidancy-form.component";
import { Router } from "@angular/router";

@Component({
  selector: "app-job-offer",
  templateUrl: "./job-offer.component.html",
  styleUrls: ["./job-offer.component.css"],
})
export class JobOfferComponent implements OnInit {
  jobOffers: any;
  title = "";
  currentJobOffer: any;
  currentIndex = -1;
  message = "";
  idUser!: string;
  roles: string[] = [];
  username!: string;

  constructor(
    private jobofferService: JobOfferService,
    public dialog: MatDialog,
    private CandidateService: CandidancyService,
    private router: Router
  ) {}

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
    this.message = "";
    this.retrieveJobOffers();
  }
  retrieveJobOffers() {
    this.jobofferService.getAll().subscribe(
      (data) => {
        this.jobOffers = data;
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  searchTitle() {
    this.jobofferService.findbytitle(this.title).subscribe(
      (data) => {
        this.jobOffers = data;
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  setActiveJobOffer(jobOffer: any, index: any) {
    this.currentJobOffer = jobOffer;
    this.currentIndex = index;
  }
  deletejobOfferr(id: number): void {
    const dialogRef = this.dialog.open(DeleteConfirmationModelPopupComponent, {
      width: "300px",
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // User clicked "Delete", perform deletion logic here
        this.deletejobOffer(id);
      } else {
        // User clicked "Cancel", do nothing or handle accordingly
      }
    });
  }
  deletejobOffer(id: any) {
    this.jobofferService.delete(id).subscribe(
      (response) => {
        console.log(response);
        this.retrieveJobOffers();
      },
      (error) => {
        console.log(error);
      }
    );
  }
  getJobOffer(id: any) {
    this.jobofferService.get(id).subscribe(
      (data) => {
        this.currentJobOffer = data;
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  updatejobOffer() {
    this.jobofferService
      .update(this.currentJobOffer.id, this.currentJobOffer)
      .subscribe(
        (response) => {
          console.log(response);
          this.message = "The job offer was updated successfully!";
          this.retrieveJobOffers();
        },
        (error) => {
          console.log(error);
        }
      );
  }
  applyforjobOffer(jobOfferId: any, candidate: any) {
    this.CandidateService.createCandidancy(
      candidate,
      jobOfferId,
      this.idUser
    ).subscribe(
      (response) => {
        console.log(response);
        this.message = "The job offer was applied successfully!";
      },
      (error) => {
        console.log(error);
      }
    );
  }
  onApplyButtonClick(jobId: string) {
    this.router.navigate(["/apply", jobId]);
  }
}
