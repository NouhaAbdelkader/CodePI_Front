import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { ChatConsumerServiceService } from "src/app/Services/ForumService/chat-consumer-service.service";
import { TokenStorageService } from "src/app/Services/UserCorzeloServices/token-storage.service";
import { MatDialog } from "@angular/material/dialog";
import { AddjobOfferComponent } from "src/app/Components/RecruitementComponents/addjob-offer/addjob-offer.component";

@Component({
  selector: "app-nav-bar",
  templateUrl: "./nav-bar.component.html",
  styleUrls: ["./nav-bar.component.css"],
})
export class NavBarComponent {
  public greetingSubject!: Subscription;
  public greeting!: any;
  public greeting2Subject!: Subscription;
  public greeting2!: any;
  public prime2Subject!: Subscription;
  public prime2: any = null;
  public notificationCount!: number;
  public notificationCountSubject!: Subscription;
  public notificationCount2!: number;
  public notificationCount2Subject!: Subscription;
  public notificationCount3!: number;
  public notificationCount3Subject!: Subscription;
  public roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;
  userIdReciver!: string;
  idUser!: string;
  rolee: string[] = [];

  constructor(
    private chatService: ChatConsumerServiceService,
    private tokenStorageService: TokenStorageService,
    private router: Router
  ) {}

  ngOnInit() {
    this.userIdReciver = sessionStorage.getItem("UserIdReciver") as string;
    console.log("**************sensennn*", this.userIdReciver);
    //
    let user = sessionStorage.getItem("auth-user");
    console.log("User from sessionStorage:", user);
    if (user) {
      let userData = JSON.parse(user);
      console.log("Parsed user data:", userData);
      this.idUser = userData.id;
      //this.username = userData.username;
      this.rolee = userData.roles;
      console.log("Roles:", this.roles);
    }
    //pour  le update ou l'ajout recupératipn de boolean et le id
    this.greetingSubject = this.chatService
      .getgreeting()
      .subscribe((greeting) => {
        this.greeting = greeting;
      });
    this.greeting2Subject = this.chatService
      .getgreeting2()
      .subscribe((greeting2) => {
        this.greeting2 = greeting2;
      });
    this.notificationCountSubject = this.chatService
      .getnotificationCount()
      .subscribe((notificationCount) => {
        this.notificationCount = notificationCount;
      });
    this.notificationCount3Subject = this.chatService
      .getnotificationCount3()
      .subscribe((notificationCount3) => {
        this.notificationCount3 = notificationCount3;
      });
    // console.log("malaaaaaaaaaaaaa notif/////////////////////////////////////////////////////////////",this.notificationCount2)
    this.prime2Subject = this.chatService.getprime2().subscribe((prime2) => {
      this.prime2 = prime2;
    });
    this.notificationCount2Subject = this.chatService
      .getnotificationCount2()
      .subscribe((notificationCount2) => {
        this.notificationCount2 = notificationCount2;
        console.log(
          "malaaaaaaaaaaaaa notif/////////////////////////////////////////////////////////////",
          this.notificationCount2
        );
      });
    ///For session
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes("ROLE_ADMIN");
      this.showModeratorBoard = this.roles.includes("ROLE_MODERATOR");

      this.username = user.username;
    }
  }
  resetNotificationCount() {
    this.notificationCount = 0;
    this.greeting = null;
    this.chatService.setnotificationCount(0);
  }
  resetNotificationCount2() {
    this.notificationCount2 = 0;
    this.prime2 = null;
    this.chatService.setnotificationCount2(0);
  }
  resetNotificationCount3() {
    this.notificationCount3 = 0;
    this.greeting2 = null;
    this.chatService.setnotificationCount3(0);
  }
  logout(): void {
    this.tokenStorageService.signOut();
    //window.location.reload();
    this.router.navigateByUrl("/login");
  }
}
