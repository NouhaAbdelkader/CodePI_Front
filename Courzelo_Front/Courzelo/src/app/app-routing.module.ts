import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { QuestionComponent } from "./Components/Forum/question/question.component";
import { AnswerComponent } from "./Components/Forum/answer/answer.component";
import { ChatComponent } from "./Components/Forum/chat/chat.component";
import { IncentivesComponent } from "./Components/Forum/incentives/incentives.component";
import { AcceuilPrimComponent } from "./Components/Forum/acceuil-prim/acceuil-prim.component";
import { ChartComponentComponent } from "./Components/Forum/chart-component/chart-component.component";
import { HomeComponent } from "./home/home.component";
import { RegisterComponent } from "./register/register.component";
import { ProfileComponent } from "./profile/profile.component";
import { LoginComponent } from "./login/login.component";
import { BoardAdminComponent } from "./board-admin/board-admin.component";

import { AddTestComponent } from "./Components/EvaluationComponent/add-test/add-test.component";
import { AddQuestionComponent } from "./Components/EvaluationComponent/add-question/add-question.component";
import { AllTestsComponent } from "./Components/EvaluationComponent/all-tests/all-tests.component";
import { EditTestComponent } from "src/app/Components/EvaluationComponent/edit-test/edit-test.component";
import { AllModulesComponent } from "src/app/Components/EvaluationComponent/all-modules/all-modules.component";
import { TestOptionsDialogComponent } from "src/app/Components/EvaluationComponent/test-options-dialog/test-options-dialog.component";
import { TakeTestComponent } from "src/app/Components/EvaluationComponent/take-test/take-test.component";
import { GradesComponent } from "src/app/Components/EvaluationComponent/grades/grades.component";
import { RewardsComponent } from "src/app/Components/EvaluationComponent/rewards/rewards.component";
import { RewardsStatisticsComponent } from "./Components/EvaluationComponent/rewards-statistics/rewards-statistics.component";
import { SuccesComponent } from "./Components/EvaluationComponent/succes/succes.component";
import { FinalEvaluationComponent } from "./Components/EvaluationComponent/final-evaluation/final-evaluation.component";
import { RevisionComponent } from "./Components/EvaluationComponent/revision/revision.component";
import { JobOfferComponent } from "./Components/RecruitementComponents/job-offer/job-offer.component";
import { AddjobOfferComponent } from "./Components/RecruitementComponents/addjob-offer/addjob-offer.component";
import { UpdatejobOfferComponent } from "./Components/RecruitementComponents/updatejob-offer/updatejob-offer.component";
import { CandidancyComponent } from "./Components/RecruitementComponents/candidancy/candidancy.component";
import { CandidancyFormComponent } from "./Components/RecruitementComponents/candidancy-form/candidancy-form.component";
import { UpdateCandidancyComponent } from "./Components/RecruitementComponents/update-candidancy/update-candidancy.component";
import { AddQuestionFeedbackComponent } from "./Components/FeedBackComponents/add-question-feedback/add-question-feedback.component";
import { AddFeedbackModuleComponent } from "./Components/FeedBackComponents/add-feedback-module/add-feedback-module.component";
import { AddFeedbackTeacherComponent } from "./Components/FeedBackComponents/add-feedback-teacher/add-feedback-teacher.component";
import { ViewFeedbackModuleComponent } from "./Components/FeedBackComponents/view-feedback-module/view-feedback-module.component";
import { ViewFeedbackTeacherComponent } from "./Components/FeedBackComponents/view-feedback-teacher/view-feedback-teacher.component";
import { ViewFeedbacksComponent } from "./Components/FeedBackComponents/view-feedbacks/view-feedbacks.component";
import { EvGuideComponent } from "./Components/EvaluationComponent/ev-guide/ev-guide.component";

import { GetlevelComponent } from './Components/AcademicProgram/level/getlevel/getlevel.component';
import { UpdatelevelComponent } from './Components/AcademicProgram/level/updatelevel/updatelevel/updatelevel.component';
import { GetallclassComponent } from './Components/AcademicProgram/class/getallClass/getallclass/getallclass.component';
import { UpdateclassComponent } from './Components/AcademicProgram/class/updatclass/updateclass/updateclass.component';
import { ModuleComponent } from './Components/AcademicProgram/module/module.component';
import { GetallmoduleComponent } from './Components/AcademicProgram/module/getallmodule/getallmodule.component';
import { UpdatemoduleComponent } from './Components/AcademicProgram/module/updatemodule/updatemodule.component';
import { UpdatecourseComponent } from './Components/AcademicProgram/course/updatecourse/updatecourse.component';
import { CourseComponent } from './Components/AcademicProgram/course/course.component';
import { GetallcoursesComponent } from './Components/AcademicProgram/course/getallcourses/getallcourses.component';
import { AcedemicProgramComponent } from './Components/AcademicProgram/acedemic-program/acedemic-program.component';
import { GetproandaccessmoduleComponent } from './Components/AcademicProgram/acedemic-program/getproandaccessmodule/getproandaccessmodule.component';
import { EtcoursesymoduleComponent } from './Components/AcademicProgram/course/etcoursesymodule/etcoursesymodule.component';
import { FilecomponentComponent } from './Components/AcademicProgram/class/filecomponent/filecomponent.component';
import { ViewfileComponent } from './Components/AcademicProgram/class/viewfile/viewfile.component';
import { ProjectComponent } from './Components/ProjectCompnents/project/project.component';
import { GetallprojectComponent } from './Components/ProjectCompnents/getallproject/getallproject.component';
import { GetallprojectbyuserComponentComponent } from './Components/ProjectCompnents/user/getallprojectbyuser-component/getallprojectbyuser-component.component';
import { LandingPageComponent } from './shared/HomeLandingPage/landing-page/landing-page.component';
import { TaskjiraComponent } from './Components/ProjectCompnents/user/taskjira/taskjira.component';
import { DocumentationsComponent } from './Components/ProjectCompnents/user/documentations/documentations.component';
import { LevelComponent } from "./Components/AcademicProgram/level/level.component";
import { ClassComponent } from "./Components/AcademicProgram/class/class.component";
import { SessionsComponent } from "./Components/SessionComponenets/sessions/sessions.component";
import { ScheduleComponent } from "./Components/SessionComponenets/schedule/schedule.component";
import { SessionChatComponent } from "./Components/SessionComponenets/session-chat/session-chat.component";
import { EventBackComponent } from "./Components/EventComponent/event-back/event-back.component";
import { HomeBarComponent } from "./home-bar/home-bar.component";
import { CoursesclientComponent } from "./components/shared/coursesclient/coursesclient.component";



const routes: Routes = [
  { path: "forumQuestion", component: QuestionComponent },
  { path: "forumAnswers/:id", component: AnswerComponent },
  { path: "forumChat", component: ChatComponent },
  { path: "forumIncentives", component: IncentivesComponent },
  { path: "acceuilncentives", component: AcceuilPrimComponent },
  { path: "chart", component: ChartComponentComponent },
  { path: "home", component: HomeComponent },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "profile", component: ProfileComponent },
  { path: "admin", component: BoardAdminComponent },
  { path: "add-test", component: AddTestComponent },
  { path: "add-question", component: AddQuestionComponent },
  { path: "all-tests", component: AllTestsComponent }, // Ajoutez cette ligne
  { path: "all-Modules", component: AllModulesComponent }, // Ajoutez cette ligne
  { path: "testdialog", component: TestOptionsDialogComponent },
  { path: "take-test", component: TakeTestComponent },
  { path: "grades", component: GradesComponent },
  { path: "rewards", component: RewardsComponent },
  { path: "rewardsStat", component: RewardsStatisticsComponent },
  { path: "succes", component: SuccesComponent },
  { path: "finalGrade", component: FinalEvaluationComponent },
  { path: "revision", component: RevisionComponent },
  { path: "forumQuestion", component: QuestionComponent },
  { path: "forumAnswers", component: AnswerComponent },
  { path: "jobOffer", component: JobOfferComponent },
  { path: "addjobOffer", component: AddjobOfferComponent },
  { path: "updatejobOffer/:id", component: UpdatejobOfferComponent },
  { path: "candicancy", component: CandidancyComponent },
  { path: "apply/:jobId", component: CandidancyFormComponent },
  { path: "update/:id", component: UpdateCandidancyComponent },
  { path: "addQuestionfeedback", component: AddQuestionFeedbackComponent },
  { path: "addFeedbackModule", component: AddFeedbackModuleComponent },
  { path: "addFeedbackTeacher", component: AddFeedbackTeacherComponent },
  { path: "viewFeedbackModule", component: ViewFeedbackModuleComponent },
  { path: "viewFeedbackTeacher", component: ViewFeedbackTeacherComponent },
  { path: "viewfeedbacks", component: ViewFeedbacksComponent },
  { path: "evguide", component: EvGuideComponent },
  {path:'Level', component:LevelComponent},//admin
  {path:'Class', component:ClassComponent},//admin
  {path:'getalllevels', component:GetlevelComponent},//admin
  {path:'updatelevels/:id', component:UpdatelevelComponent},//admin
  {path:'updateclass/:id', component:UpdateclassComponent},//admin
  {path:'getallmodules', component:GetallmoduleComponent},//admin
  {path:'getallclasses', component:GetallclassComponent},//admin
  {path:'addclass', component:ClassComponent},//admin
  {path:'addmodule', component:ModuleComponent},//admin
  {path:'updatemodule/:id', component:UpdatemoduleComponent},//admin
  {path:'updatecourse/:id', component:UpdatecourseComponent},//admin
  {path:'addcourse', component:CourseComponent},//admin
  {path:'getallacourses', component:GetallcoursesComponent},//admin
  {path:'getprogram', component:AcedemicProgramComponent},//user
  { path: 'courses/:moduleId', component: EtcoursesymoduleComponent},//user thabtou
  { path: 'getprogaccesstocourse', component: GetproandaccessmoduleComponent},//admin
  { path: 'fileupload/:courseId', component: FilecomponentComponent},//user _____
  { path: 'file/:courseId', component: ViewfileComponent},//user
  {path:'addProject', component:ProjectComponent}, //teacher
  { path: 'getallprojects', component: GetallprojectComponent },//teacher
  { path: 'getallprojectsbyuser', component: GetallprojectbyuserComponentComponent },
  { path: 'HomePage', component: LandingPageComponent },
  { path: 'progress/:id', component: TaskjiraComponent },//user--------
  { path: 'Documentation', component: DocumentationsComponent },// home page project
  {path:'sessions', component:SessionsComponent},
  {path:'schedule', component:ScheduleComponent},
  {path:'sessionchat', component:SessionChatComponent},
  {path: 'events', component:EventBackComponent},
  {path: 'homeBar', component:HomeBarComponent},
  { path: 'clientcourses/:moduleId', component: CoursesclientComponent }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
