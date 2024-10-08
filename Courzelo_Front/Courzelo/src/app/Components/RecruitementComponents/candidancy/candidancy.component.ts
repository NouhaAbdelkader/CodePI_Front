import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { CandidancyService } from "src/app/Services/RecruitementServices/candidancy.service";

@Component({
  selector: "app-candidancy",
  templateUrl: "./candidancy.component.html",
  styleUrls: ["./candidancy.component.css"],
})
export class CandidancyComponent {
  candicancis: any;
  constructor(
    private candicancyService: CandidancyService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  ngOnInit() {
    this.retrieveCandicancy();
  }

  retrieveCandicancy() {
    this.candicancyService.getAll().subscribe(
      (data) => {
        this.candicancis = data;
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  getcandicancybyid(id: number) {
    this.candicancyService.get(id).subscribe(
      (data) => {
        this.candicancis = data;
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  deleteCandidacy(id: number) {
    this.candicancyService.delete(id).subscribe(
      (response) => {
        console.log(response);
        this.refreshData();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  refreshData() {
    this.candicancyService.getAll().subscribe(
      (response) => {
        this.candicancis = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  updatecandicancy() {
    this.candicancyService
      .update(this.candicancis.id, this.candicancis)
      .subscribe(
        (response) => {
          console.log(response);
          this.retrieveCandicancy();
        },
        (error) => {
          console.log(error);
        }
      );
  }
  updateCandidacy(id: number) {
    this.router.navigate(["/update", id]);
  }
}
