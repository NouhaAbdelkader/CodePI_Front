import { Injectable } from '@angular/core';
import {webSocket, WebSocketSubject} from 'rxjs/webSocket';
import { Message } from './types/message';
import { Subject } from 'rxjs';

export const WS_ENDPOINT = 'ws://localhost:8082';

@Injectable({
  providedIn: 'root'
})
export class ChatServiceService {

  private socket$!: WebSocketSubject<any>;

  private messageSubject = new Subject<Message>();
  public message$ = this.messageSubject.asObservable();
  constructor() { }


  public connect(): void{
    this.socket$ = this.getNewWebSocket();
    console.log("Testing if blob");
    this.socket$.subscribe(
      msg => {
        console.log('Received message of type : '+msg.type);
        this.messageSubject.next(msg);
      }
    )
  }

  sendMessage(msg: Message): void{
    console.log('sending message' + msg.type);
    this.socket$.next(msg);
  }


  private getNewWebSocket(): WebSocketSubject<any>{
    return webSocket({
      url : WS_ENDPOINT,
      openObserver: {
        next: () => {
          console.log('DataService: connection OK');
        }
      },
      closeObserver : {
        next: () => {
          console.log('DataService : connection closed');
          this.socket$ = undefined;
          this.connect();
        }
      }
    })
  }
}
