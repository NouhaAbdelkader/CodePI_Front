import { Speciality } from "../UserCorzelo/UserCourzelo";

export class JobOffer {
  id!: number;
  title!: string;
  description!: string;
  skills!: string;
  speciality!: Speciality;
  experience!: string;
  matchingScore!: number;
}
