import { UserCourzelo } from "../UserCorzelo/UserCourzelo";
import { EventC } from "./Event";

export class Rsvp{
    id:string|undefined;
    event!:EventC;
    status!:string;
    user:UserCourzelo|undefined;
}