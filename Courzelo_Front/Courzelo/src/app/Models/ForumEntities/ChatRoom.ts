import { UserCourzelo } from "../UserCorzelo/UserCourzelo";
import { Message } from "./Message";


export class ChatRoom{

    id!: number;
    sender!: UserCourzelo;
    
receiver!:UserCourzelo;
    messages:Message[]=[] 
    
}