import { QuestionForum } from "../ForumEntities/QuestionForum";



export class UserCourzelo{

    id: string |undefined;  
    username: string|undefined;  
      
    firstName!: string;
    lastName!: string;
    email!: string;
    password!: string;
    image!: string;
    sexe!:string;
    dateOfBirth:Date |undefined;
    dateOfCreation:Date | undefined;
    nbHoursMaxPerWeek!:number;
    nbHoursPerWeek = 0;
    role?:ERole;
    companyName!:string;
    descriptionRecruiter!:string;
    scoreXp!:number;
    //resume!:
    level!:number;
    overAllAverage!:number;
    speciality!:Speciality;
    approved:boolean = false;
    validVoteCount: number = 0;
    canVote : boolean = true;
    nbVoteForIncentives!:number;
    nbPrimeVoteForBadge!:number;
    PaymentDay: Date |undefined;
    Hobbies!:string;
    badges:badgeType[]=[]
    questionForums:QuestionForum[]=[]

}
export enum ERole{
   Teacher,
   Student,
   Moderator,
   Admin,
   Recruiter
}
export enum Speciality{
    BD = 'BD',
    Angular = 'Angular',
    Spring = 'Spring',
    DotNet = 'DotNet',
    Reseau = 'Reseau',
    IA = 'IA',
    Mobile = 'Mobile',
    Web = 'Web',
    Cloud = 'Cloud',
    DevOps = 'DevOps',
    Security = 'Security',
    Design = 'Design',
    Management = 'Management',
    Marketing = 'Marketing',
    Finance = 'Finance',
}
export enum badgeType{
    GOLD,SILVER,BRONZE,DIMOND
}