import * as SockJS from 'sockjs-client';


import { Stomp } from '@stomp/stompjs';
import { ModalpopupComponentComponent } from 'src/app/Components/Forum/modalpopup-component/modalpopup-component.component';
import { ChatComponent } from 'src/app/Components/Forum/chat/chat.component';
import { AnswerComponent } from 'src/app/Components/Forum/answer/answer.component';

export class WebSocketPrime {
    webSocketEndPoint: string = 'http://localhost:8081/ws';
   
    topic: string = "/topic/primes";
    topic2: string = "/topic/prime2";
    stompClient: any;
    appComponent: AnswerComponent;
 
    connectCallback!: () => void;

    constructor(appComponent: AnswerComponent ) {
        this.appComponent = appComponent;
      
    }

    _connect() {
      console.log('Initialize WebSocket Connection');
      const ws = new SockJS(this.webSocketEndPoint);
      this.stompClient = Stomp.over(ws);
      this.stompClient.connect({}, () => {
        this.stompClient.subscribe(this.topic, (sdkEvent: string) => {
          this.onMessageReceived(sdkEvent);
          
          
        })
        console.log('WebSocket Connected !!!!');
        if (this.connectCallback) {
          this.connectCallback(); // Appeler le callback une fois la connexion établie
        }
      }, this.errorCallBack.bind(this));
    }
    
      _disconnect() {
        if (this.stompClient !== null) {
          this.stompClient.disconnect();
          console.log('WebSocket Disconnected');
        }
      }
    
      errorCallBack(error: string) {
        console.error('WebSocket Error: ', error);
      }
    

    onMessageReceived(message: any) {
    
        console.log("Message Received from Server :: " + message);
       this.appComponent.handleMessage11( message.body.substring(message.body.indexOf('\n\n') + 2));
       //let msg = JSON.parse(message.body).content;
       let content = message.body.substring(message.body.indexOf('\n\n') + 2);
     }
    onConnect(callback: () => void) {
      this.connectCallback = callback;
    }
  ///////////////////partie primes 2

  _connect2() {
    console.log('Initialize WebSocket Connection');
    const ws = new SockJS(this.webSocketEndPoint);
    this.stompClient = Stomp.over(ws);
    this.stompClient.connect({}, () => {
      this.stompClient.subscribe(this.topic2, (sdkEvent: string) => {
        this.onMessageReceived2(sdkEvent);
        
        
      })
      console.log('WebSocket Connected !!!!');
      if (this.connectCallback) {
        this.connectCallback(); // Appeler le callback une fois la connexion établie
      }
    }, this.errorCallBack.bind(this));
  }
  onMessageReceived2(message: any) {
    
    console.log("Message Received from Server :: " + message);
   this.appComponent.handleMessage12( message.body.substring(message.body.indexOf('\n\n') + 2));
   //let msg = JSON.parse(message.body).content;
   let content = message.body.substring(message.body.indexOf('\n\n') + 2);
 }

}
