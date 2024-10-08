import { Component } from "@angular/core";
import { BadgeForumTeacher } from "src/app/Models/ForumEntities/BadgeForumTeacher";
import { Incentives } from "src/app/Models/ForumEntities/Incentives";
import { VoteConsumerService } from "src/app/Services/ForumService/vote-consumer.service";

@Component({
  selector: "app-incentives",
  templateUrl: "./incentives.component.html",
  styleUrls: ["./incentives.component.css"],
})
export class IncentivesComponent {
  listIncentives: Incentives[] = [];
  listBadges: BadgeForumTeacher[] = [];
  idUser!: string;
  roles: any = {};
  constructor(private voteService: VoteConsumerService) {}
  ngOnInit(): void {
    //session
    let user = sessionStorage.getItem("auth-user");
    if (user) {
      let userData = JSON.parse(user);
      this.idUser = userData.id;
      //this.username = userData.username;
      this.roles = userData.roles;
    }
    //
    this.voteService
      .getIncentivesByTeacher(this.idUser)
      .subscribe((data: Incentives[]) => {
        this.listIncentives = data;
      });
    this.voteService
      .getBadgesByTeacher(this.idUser)
      .subscribe((data: BadgeForumTeacher[]) => {
        this.listBadges = data;
      });
  }
}
