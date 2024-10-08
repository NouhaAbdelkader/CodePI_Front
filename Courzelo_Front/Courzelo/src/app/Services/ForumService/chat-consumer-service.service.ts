import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, throwError } from 'rxjs';
import { ChatRoom } from 'src/app/Models/ForumEntities/ChatRoom';
import { Media } from 'src/app/Models/ForumEntities/Media';
import { Message } from 'src/app/Models/ForumEntities/Message';

@Injectable({
  providedIn: 'root'
})
export class ChatConsumerServiceService {

  constructor(private http:HttpClient) { }

    //je vais passer le id user session par lien
  createChatRoom(chat: ChatRoom, receiverId:string, id:string ) {
    return this.http.post('http://localhost:8081/ForumChat/createChat/'+id+'/'+receiverId,chat);
  }
   //je vais passer le id user session par lien
  getChatRoomsByUser(id:string):Observable<ChatRoom[]>{
    return  this.http.get<ChatRoom[]>('http://localhost:8081/ForumChat/getAllChatsByUser/'+id)
    .pipe(
      catchError(error => {
        console.error('Error fetching questions:', error);
        return throwError(error);
      })
    );
  }
  //
  getChatRoomsBySenderOrReciver(id:string,id2:string):Observable<ChatRoom[]>{
    return  this.http.get<ChatRoom[]>('http://localhost:8081/ForumChat/getAllChatsBySenderOrReciver/'+id+'/'+id2)
    .pipe(
      catchError(error => {
        console.error('Error fetching questions:', error);
        return throwError(error);
      })
    );
  }
  //je vais passer le id user1p session ar lien
  getChatRoomByUse1AndUser2( idUser2:string,iduser1:string){
    return  this.http.get<ChatRoom>('http://localhost:8081/ForumChat/getChatBySenderAndReceiver/'+iduser1+'/'+ idUser2);
  }
  getChatRoomByUse1AndUser1( idUser2:string,iduser1:string){
    return  this.http.get<ChatRoom>('http://localhost:8081/ForumChat/get/getChatBySenderAndReceiverOpp/'+iduser1+'/'+ idUser2);
  }
  getChatRoomByUse1AndUsernajiba( idUser2:string,iduser1:string){
    return  this.http.get<ChatRoom>('http://localhost:8081/ForumChat/get/getChatBySenderAndReceiver/'+iduser1+'/'+ idUser2);
  }
  //get chat by id
    //je vais passer le id user1p session ar lien
    getChatById( id:number){
      return  this.http.get<ChatRoom>('http://localhost:8081/ForumChat'+'/'+ id);
    }


    sendMessage(p:Message,idChat:number, iduser1:string){
      return this.http.put('http://localhost:8081/ForumChat/message'+'/'+idChat+'/'+iduser1, p);
    }

    updateMediaChat(
      chatId: any,
      image: any,
      fileType: string,
      username: string
    ): Observable<Object> {
      const formData = new FormData();
      formData.append('chatId', chatId);
      formData.append('image', image);
      formData.append('fileType', fileType);
      formData.append('username', username);
      return this.http.post('http://localhost:8081/ForumChat/media/message',formData);
  
    
    }

    getMediaById( id:string){
      return  this.http.get<Media>('http://localhost:8081/ForumChat/media'+'/'+ id);
    }
  //des manipulations services


private idSubject = new BehaviorSubject<number>(0); // Initialisez avec une valeur par défaut
id$: Observable<number> = this.idSubject.asObservable();

setId(id: number) {
  this.idSubject.next(id);
}

getId(): Observable<number> {
  return this.id$;
}
private notificationCountSubject = new BehaviorSubject<number>(0); // Initialisez avec une valeur par défaut
notificationCount$: Observable<number> = this.notificationCountSubject.asObservable();

setnotificationCount(notificationCount: number) {
  this.notificationCountSubject.next(notificationCount);
}

getnotificationCount(): Observable<number> {
  return this.notificationCount$;
}
private greetingSubject = new BehaviorSubject<any>(''); // Initialisez avec une valeur par défaut
greeting$: Observable<any> = this.greetingSubject.asObservable();

setgreeting(greeting: any) {
  this.greetingSubject.next(greeting);
}

getgreeting(): Observable<any> {
  return this.greeting$;
}
//For Prime Explication
private notificationCount2Subject = new BehaviorSubject<number>(0); // Initialisez avec une valeur par défaut
notificationCount2$: Observable<number> = this.notificationCount2Subject.asObservable();
setnotificationCount2(notificationCount2: number) {
  this.notificationCount2Subject.next(notificationCount2);
}

getnotificationCount2(): Observable<number> {
  return this.notificationCount2$;
}

private prime2Subject = new BehaviorSubject<any>(''); // Initialisez avec une valeur par défaut
prime2$: Observable<any> = this.prime2Subject.asObservable();

setprime2(prime2: any) {
  this.prime2Subject.next(prime2);
}

getprime2(): Observable<any> {
  return this.prime2$;
}
//For analyse senti
private notificationCount3Subject = new BehaviorSubject<number>(0); // Initialisez avec une valeur par défaut
notificationCount3$: Observable<number> = this.notificationCount3Subject.asObservable();
setnotificationCount3(notificationCount3: number) {
  this.notificationCount3Subject.next(notificationCount3);
}

getnotificationCount3(): Observable<number> {
  return this.notificationCount3$;
}
private greeting2Subject = new BehaviorSubject<any>(''); // Initialisez avec une valeur par défaut
greeting2$: Observable<any> = this.greeting2Subject.asObservable();
setgreeting2(greeting2: any) {
  this.greeting2Subject.next(greeting2);
}

getgreeting2(): Observable<any> {
  return this.greeting2$;
}

}
