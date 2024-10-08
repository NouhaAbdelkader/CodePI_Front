import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { SideBarComponent } from "./shared/side-bar/side-bar.component";
import { NavBarComponent } from "./shared/nav-bar/nav-bar.component";
import { QuestionComponent } from "./Components/Forum/question/question.component";
import { AnswerComponent } from "./Components/Forum/answer/answer.component";
import { ChatComponent } from "./Components/Forum/chat/chat.component";
import { HttpClientModule } from "@angular/common/http";
import { ModalpopupComponentComponent } from "./Components/Forum/modalpopup-component/modalpopup-component.component";

import { MatDialogModule } from "@angular/material/dialog";
import { MatSelectModule } from "@angular/material/select";
import { FormsModule,ReactiveFormsModule } from "@angular/forms"; // Import FormsModule here
import { MdbModalModule } from "mdb-angular-ui-kit/modal";
import { JobOfferComponent } from "./Components/RecruitementComponents/job-offer/job-offer.component";
import { AddjobOfferComponent } from "./Components/RecruitementComponents/addjob-offer/addjob-offer.component";
import { UpdatejobOfferComponent } from "./Components/RecruitementComponents/updatejob-offer/updatejob-offer.component";
import { DeleteConfirmationModelPopupComponent } from "./Components/RecruitementComponents/delete-confirmation-model-popup/delete-confirmation-model-popup.component";
import { CandidancyComponent } from "./Components/RecruitementComponents/candidancy/candidancy.component";
import { CandidancyFormComponent } from "./Components/RecruitementComponents/candidancy-form/candidancy-form.component";
import { UpdateCandidancyComponent } from "./Components/RecruitementComponents/update-candidancy/update-candidancy.component";
import { ViewQuestionFeedbackComponent } from "./Components/FeedBackComponents/view-question-feedback/view-question-feedback.component";
import { AddQuestionFeedbackComponent } from "./Components/FeedBackComponents/add-question-feedback/add-question-feedback.component";
import { AddFeedbackModuleComponent } from "./Components/FeedBackComponents/add-feedback-module/add-feedback-module.component";
import { ViewFeedbackModuleComponent } from "./Components/FeedBackComponents/view-feedback-module/view-feedback-module.component";
import { AddFeedbackTeacherComponent } from "./Components/FeedBackComponents/add-feedback-teacher/add-feedback-teacher.component";
import { ViewFeedbackTeacherComponent } from "./Components/FeedBackComponents/view-feedback-teacher/view-feedback-teacher.component";
import { ViewFeedbacksComponent } from "./Components/FeedBackComponents/view-feedbacks/view-feedbacks.component";

import { ChartComponentComponent } from "./Components/Forum/chart-component/chart-component.component";
import { ChartModule } from "angular-highcharts";
import { AuthGuard } from "./auth-guard.guard";
import { authInterceptorProviders } from "./_helpers/auth.interceptor";
import { UserCorzeloComponent } from "./Components/user-corzelo/user-corzelo.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { HomeComponent } from "./home/home.component";
import { ProfileComponent } from "./profile/profile.component";
import { BoardAdminComponent } from "./board-admin/board-admin.component";
import { BoardModeratorComponent } from "./board-moderator/board-moderator.component";
import { BoardUserComponent } from "./board-user/board-user.component";
import { EmptyComponentComponent } from "./empty-component/empty-component.component";
import { AcceuilPrimComponent } from "./Components/Forum/acceuil-prim/acceuil-prim.component";
import { NavBarOUTComponent } from "./shared/nav-bar-out/nav-bar-out.component";

import { AddTestComponent } from "./Components/EvaluationComponent/add-test/add-test.component";
import { AddQuestionComponent } from "./Components/EvaluationComponent/add-question/add-question.component";
import { CommonModule, DatePipe } from "@angular/common";
import { AllTestsComponent } from "./Components/EvaluationComponent/all-tests/all-tests.component";
import { EditTestComponent } from "src/app/Components/EvaluationComponent/edit-test/edit-test.component";
import { TakeTestComponent } from "src/app/Components/EvaluationComponent/take-test/take-test.component";
import { AllModulesComponent } from "src/app/Components/EvaluationComponent/all-modules/all-modules.component";
import { TestOptionsDialogComponent } from "src/app/Components/EvaluationComponent/test-options-dialog/test-options-dialog.component";
import { GradesComponent } from "src/app/Components/EvaluationComponent/grades/grades.component";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { RewardsComponent } from "src/app/Components/EvaluationComponent/rewards/rewards.component";
import { RewardsStatisticsComponent } from "./Components/EvaluationComponent/rewards-statistics/rewards-statistics.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatCardModule } from "@angular/material/card";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { SuccesComponent } from "./Components/EvaluationComponent/succes/succes.component";
import { FinalEvaluationComponent } from "./Components/EvaluationComponent/final-evaluation/final-evaluation.component";
import { RevisionComponent } from "./Components/EvaluationComponent/revision/revision.component";
import { NgbRatingModule } from "@ng-bootstrap/ng-bootstrap";
import { MatIconModule } from "@angular/material/icon";
import { IncentivesComponent } from "./Components/Forum/incentives/incentives.component";
import { EvGuideComponent } from './Components/EvaluationComponent/ev-guide/ev-guide.component';
import { AcedemicProgramComponent } from './Components/AcademicProgram/acedemic-program/acedemic-program.component';
import { ModuleComponent } from './Components/AcademicProgram/module/module.component';
import { ClassComponent } from './Components/AcademicProgram/class/class.component';
import { LevelComponent } from './Components/AcademicProgram/level/level.component';
import { CourseComponent } from './Components/AcademicProgram/course/course.component';
import { ProjectComponent } from './Components/ProjectCompnents/project/project.component';
import { UpdatelevelComponent } from './Components/AcademicProgram/level/updatelevel/updatelevel/updatelevel.component';
import { GetlevelComponent } from './Components/AcademicProgram/level/getlevel/getlevel.component';
import { UpdateclassComponent } from './Components/AcademicProgram/class/updatclass/updateclass/updateclass.component';
import { GetallclassComponent } from './Components/AcademicProgram/class/getallClass/getallclass/getallclass.component';
import { UpdatemoduleComponent } from './Components/AcademicProgram/module/updatemodule/updatemodule.component';
import { GetallmoduleComponent } from './Components/AcademicProgram/module/getallmodule/getallmodule.component';
import { GetallcoursesComponent } from './Components/AcademicProgram/course/getallcourses/getallcourses.component';
import { UpdatecourseComponent } from './Components/AcademicProgram/course/updatecourse/updatecourse.component';
import { GetproandaccessmoduleComponent } from './Components/AcademicProgram/acedemic-program/getproandaccessmodule/getproandaccessmodule.component';
import { EtcoursesymoduleComponent } from './Components/AcademicProgram/course/etcoursesymodule/etcoursesymodule.component';
import { FilecomponentComponent } from './Components/AcademicProgram/class/filecomponent/filecomponent.component';
import { ViewfileComponent } from './Components/AcademicProgram/class/viewfile/viewfile.component';
import { GetallprojectComponent } from './Components/ProjectCompnents/getallproject/getallproject.component';
import { UpdateprojectComponent } from './Components/ProjectCompnents/updateproject/updateproject.component';
import { ProjectDetailsComponentComponent } from './Components/ProjectCompnents/getallproject/project-details-component/project-details-component.component';
import { GroupGenerateComponentComponent } from './Components/ProjectCompnents/group-generate-component/group-generate-component.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { GetallprojectbyuserComponentComponent } from './Components/ProjectCompnents/user/getallprojectbyuser-component/getallprojectbyuser-component.component';
import { LandingPageComponent } from './shared/HomeLandingPage/landing-page/landing-page.component';
import { FullCalendarComponent, FullCalendarModule } from '@fullcalendar/angular';
import { TaskjiraComponent } from './Components/ProjectCompnents/user/taskjira/taskjira.component';
//import { FilterByStatusPipe } from './Models/ProjectEntities/FilterByStatusPipe';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { DocumentationsComponent } from './Components/ProjectCompnents/user/documentations/documentations.component';

import { MatGridListModule } from '@angular/material/grid-list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { EventBackComponent } from './Components/EventComponent/event-back/event-back.component';
import { SessionsComponent } from "./Components/SessionComponenets/sessions/sessions.component";
import { ScheduleComponent } from "./Components/SessionComponenets/schedule/schedule.component";
import { SessionChatComponent } from "./Components/SessionComponenets/session-chat/session-chat.component";
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HomeBarComponent } from './home-bar/home-bar.component';
import { CoursesclientComponent } from './components/shared/coursesclient/coursesclient.component';



@NgModule({
  declarations: [
    AppComponent,
    SideBarComponent,
    NavBarComponent,
    QuestionComponent,
    AnswerComponent,
    ChatComponent,
    ModalpopupComponentComponent,
    ChartComponentComponent,
    UserCorzeloComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    BoardAdminComponent,
    BoardModeratorComponent,
    BoardUserComponent,
    EmptyComponentComponent,
    AcceuilPrimComponent,
    NavBarOUTComponent,
    AddTestComponent,
    AddQuestionComponent,
    AllTestsComponent,
    EditTestComponent,
    TakeTestComponent,
    AllModulesComponent,
    TestOptionsDialogComponent,
    GradesComponent,
    RewardsComponent,
    RewardsStatisticsComponent,
    SuccesComponent,
    FinalEvaluationComponent,
    RevisionComponent,
    JobOfferComponent,
    AddjobOfferComponent,
    UpdatejobOfferComponent,
    DeleteConfirmationModelPopupComponent,
    CandidancyComponent,
    CandidancyFormComponent,
    UpdateCandidancyComponent,
    ViewQuestionFeedbackComponent,
    AddQuestionFeedbackComponent,
    AddFeedbackModuleComponent,
    ViewFeedbackModuleComponent,
    AddFeedbackTeacherComponent,
    ViewFeedbackTeacherComponent,
    ViewFeedbacksComponent,
    IncentivesComponent,
    EvGuideComponent,
    AcedemicProgramComponent,
    ModuleComponent,
    ClassComponent,
    LevelComponent,
    CourseComponent,
    ProjectComponent,
    UpdatelevelComponent,
    
    GetlevelComponent,
    UpdateclassComponent,
    GetallclassComponent,
    UpdatemoduleComponent,
    GetallmoduleComponent,
    GetallcoursesComponent,
    UpdatecourseComponent,
    GetproandaccessmoduleComponent,
    EtcoursesymoduleComponent,
    FilecomponentComponent,
    ViewfileComponent,
    GetallprojectComponent,
    UpdateprojectComponent,
    ProjectDetailsComponentComponent,
    GroupGenerateComponentComponent,
    GetallprojectbyuserComponentComponent,
    LandingPageComponent,
    TaskjiraComponent,
    DocumentationsComponent,
    SessionsComponent,
    ScheduleComponent,
    SessionChatComponent,
    EventBackComponent,
    HomeBarComponent,
    CoursesclientComponent,
  ],
  imports: [
    BrowserModule,
    MatIconModule,
    NgbRatingModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatSelectModule,
    FormsModule,
    MdbModalModule,
    MatProgressBarModule,
    ChartModule,
    MdbModalModule,
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatProgressBarModule,
    MatSnackBarModule,
    NoopAnimationsModule,
   FullCalendarModule,
   DragDropModule,
   MatToolbarModule,
   CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
    //MdbModalModule,
    //session chat 


    MatGridListModule,
    MatSidenavModule,
 
    
  ],
  providers: [authInterceptorProviders, AuthGuard, DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
