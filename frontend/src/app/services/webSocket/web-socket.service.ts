import { EventEmitter, Injectable } from '@angular/core';
import { Message } from 'app/models/message';
import { Payload } from 'app/models/payload';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService extends Socket{

  outEvent: EventEmitter<Message> = new EventEmitter();

  constructor() {
    super({
      url:"http://localhost:81",
      options:{}
    });
    this.listenEvent();
  }

  listenEvent(){
    this.ioSocket.on('new_message',(msg:Message)=>{
      this.outEvent.emit(msg);
    })
  }

  emitEvent(event:string,payload:any){
    this.ioSocket.emit(event,payload);
  }

}
