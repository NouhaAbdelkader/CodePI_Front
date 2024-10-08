import { UserCourzelo } from "../UserCorzelo/UserCourzelo";

export class Incentives{
    id!:String;
    dateOFObtaining!:Date;
    deliberationDate!:Date;
    incentivesType!:IncentiveType;
    teacher!:UserCourzelo;
}
export enum IncentiveType{
    IncentiveExplanation,
    IncentiveVote
}