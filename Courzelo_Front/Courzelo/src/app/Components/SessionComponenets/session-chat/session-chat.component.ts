import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { ChatServiceService } from 'src/app/Services/SessionService/chat-service.service';
import { Message } from 'src/app/Services/SessionService/types/message';

const mediaConstraints = {
  audio: true,
  video: {width:720, height: 540 }
};

const offerOptions = {
  offerToReceiveAudio : true,
  offerToReceiveVideo : true,
}

@Component({
  selector: 'app-session-chat',
  templateUrl: './session-chat.component.html',
  styleUrls: ['./session-chat.component.css']
})
export class SessionChatComponent implements AfterViewInit{

  @ViewChild('local_video') localVideo!: ElementRef;
  @ViewChild('received_video') receivedVideo: ElementRef;
  constructor(private dataService : ChatServiceService) {

  }

  private peerConnection!: RTCPeerConnection;
  ngAfterViewInit(): void {
    this.addIncominMessageHandler();
    this.requestMediaDevices();
  }
  addIncominMessageHandler():void {
    this.dataService.connect();

    // this.transactions$.subscribe();
    this.dataService.message$.subscribe(
      (msg)=>{
        console.log('Received message: ' + msg.type);
        switch (msg.type) {
          case 'offer':
            this.handleOfferMessage(msg.data);
            break;
          case 'answer':
            this.handleAnswerMessage(msg.data);
            break;
          case 'hangup':
            this.handleHangupMessage(msg);
            break;
          case 'ice-candidate':
            this.handleICECandidateMessage(msg.data);
            break;
          default:
            console.log('unknown message of type ' + msg.type);
        }
      },
      (error) => console.log('error :'+ error)
    );
  }
  private handleOfferMessage(msg: RTCSessionDescriptionInit) {
    console.log('handle incoming offer');
    if (!this.peerConnection) {
      this.createPeerConnection();
    }

    if (!this.localSteam) {
      this.startLocalVideo();
    }

    this.peerConnection.setRemoteDescription(new RTCSessionDescription(msg))
      .then(() => {

        // add media stream to local video
        this.localVideo.nativeElement.srcObject = this.localSteam;

        // add media tracks to remote connection
        this.localSteam.getTracks().forEach(
          track => this.peerConnection.addTrack(track, this.localSteam)
        );

      }).then(() => {

      // Build SDP for answer message
      return this.peerConnection.createAnswer();

    }).then((answer) => {

      // Set local SDP
      return this.peerConnection.setLocalDescription(answer);

    }).then(() => {

      // Send local SDP to remote party
      this.dataService.sendMessage({type: 'answer', data: this.peerConnection.localDescription});

      this.inCall = true;

    }).catch(this.handleGetUserMediaError);
  }
  private handleAnswerMessage(msg: RTCSessionDescriptionInit): void {
    console.log('handle incoming answer');
    this.peerConnection.setRemoteDescription(msg);
  }

  private handleHangupMessage(msg: Message): void {
    console.log(msg);
    this.closeVideoCall();
  }

  private handleICECandidateMessage(msg: RTCIceCandidate): void {
    const candidate = new RTCIceCandidate(msg);
    this.peerConnection.addIceCandidate(candidate).catch(this.reportError);
  }

  private async requestMediaDevices(): Promise<void>{
    this.localSteam = await navigator.mediaDevices.getUserMedia(mediaConstraints);
    //this.localVideo.nativeElement.srcObject = this.localSteam;
    //this.pauseLocalVideo();
  }

  private localSteam!:  MediaStream;
  inCall = false;
  localVideoActive = false;
  pauseLocalVideo():void{
    this.localSteam.getTracks().forEach( track => {
      track.enabled= false;
    });
    this.localVideo.nativeElement.srcObject = undefined;

    this.localVideoActive = false;
  }
  startLocalVideo():void{
    console.log('starting local steam');
    this.localSteam.getTracks().forEach( track => {
      track.enabled= true;
    });
    this.localVideo.nativeElement.srcObject = this.localSteam;

    this.localVideoActive = true;
  }

  async call(): Promise<void>{
    this.createPeerConnection();

    this.localSteam.getTracks().forEach(track => {
      this.peerConnection.addTrack(track, this.localSteam)
    });

    try{
      const offer: RTCSessionDescriptionInit = await this.peerConnection.createOffer(offerOptions);
      await this.peerConnection.setLocalDescription(offer);

      this.inCall = true;

      this.dataService.sendMessage({type: 'offer', data: offer })
    }catch(err){
      this.handleGetUserMediaError(err);
    }
  }

  hangUp() {
    this.dataService.sendMessage({type: 'hangup', data: ''});
    this.closeVideoCall();
  }

  handleGetUserMediaError(e: any) {
    switch (e.name) {
      case 'NotFoundError':
        alert('Unable to open your call because no camera and/or microphone were found.');
        break;
      case 'SecurityError':
      case 'PermissionDeniedError':
        // Do nothing; this is the same as the user canceling the call.
        break;
      default:
        console.log(e);
        alert('Error opening your camera and/or microphone: ' + e.message);
        break;
    }

    this.closeVideoCall();
  }
  createPeerConnection(): void {
    this.peerConnection = new RTCPeerConnection(
      {
        iceServers: [
          {
            urls:['stun:stun.kundenserver.de:3478']
          }
        ]
      }
    );
    this.peerConnection.onicecandidate = this.handleICECandidateEvent;
    this.peerConnection.oniceconnectionstatechange = this.handleICEConnectionStateChangeEvent;
    this.peerConnection.onsignalingstatechange = this.handleSignalingStateChangeEvent;
    this.peerConnection.ontrack = this.handleTrackEvent;
  }

  private reportError = (e: Error) => {
    console.log('got Error: ' + e.name);
    console.log(e);
  }


  private closeVideoCall(): void{
    if(this.peerConnection){
      console.log('--> Closing the peer connection');

      this.peerConnection.ontrack = null;
      this.peerConnection.onicecandidate = null;
      this.peerConnection.oniceconnectionstatechange = null;
      this.peerConnection.onsignalingstatechange = null;

      this.peerConnection.getTransceivers().forEach( trans =>{
        trans.stop();
      });
  
      this.peerConnection.close();
      this.peerConnection = null;
      this.inCall = false;
    }
  }

  private handleICECandidateEvent = (event: RTCPeerConnectionIceEvent) => {
    console.log(event);
    if (event.candidate) {
      this.dataService.sendMessage({
        type: 'ice-candidate',
        data: event.candidate
      });
    }
  }

  private handleICEConnectionStateChangeEvent = (event: Event) => {
    console.log(event);
    switch (this.peerConnection.iceConnectionState) {
      case 'closed':
      case 'failed':
      case 'disconnected':
        this.closeVideoCall();
        break;
    }
  }

  private handleSignalingStateChangeEvent = (event: Event) => {
    console.log(event);
    switch (this.peerConnection.signalingState) {
      case 'closed':
        this.closeVideoCall();
        break;
    }
  }

  private handleTrackEvent = (event: RTCTrackEvent) => {
    console.log(event);
    this.receivedVideo.nativeElement.srcObject = event.streams[0];
  }

}
