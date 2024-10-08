

export class Media{
  
    id!: string;
    chatId!: number;
    userId!: string;
    picture!:  Binary;
    fileType!: string;
    title!:string ;
    mediaType!:MediaType
}
class Binary {
    type!: number;
    data!: string;
  }
  
export enum MediaType{
    PROFILE_PICTURE, SHARED_MEDIA
}

