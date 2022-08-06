import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Errors } from 'app/constants/errors';
import { Message } from 'app/models/message';
import { WebSocketService } from 'app/services/webSocket/web-socket.service';
import gsap from 'gsap';
@Component({
  selector: 'app-chat-content',
  templateUrl: './chat-content.component.html',
  styleUrls: ['./chat-content.component.scss'],
})
export class ChatContentComponent implements OnInit {

  @ViewChild('messagesBlock') private messagesBlock: ElementRef;
  messageForm: FormGroup;
  errorMessage: string;
  messages: Message[];
  chatId: string;
  initValue:any;

  constructor(
    private formBuilder: FormBuilder,
    private websocketService: WebSocketService,
    private route: ActivatedRoute
  ) {
    this.errorMessage = '';
    this.chatId = '';
    this.messages = [];
    this.messageForm = this.formBuilder.group({
      message: ['', Validators.required],
    });
    this.initValue=this.messageForm.value;
    this.getControl()!.statusChanges.subscribe(async (status) => {
      if (status === 'INVALID') {
        this.errorMessage = this.getError();
        await gsap.to('.error', {
          duration: 1,
          display: 'block',
          translateY: 0,
          opacity: 1,
          ease: 'lineal',
        });
        return;
      }
      await gsap.to('.error', {
        duration: 1,
        translateY: 20,
        opacity: 0,
        display: 'none',
        ease: 'lineal',
      });
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((param) => {
      if(this.chatId != ''){
        this.websocketService.emitEvent('leave',this.chatId);
        this.messages=[];
      }
      this.chatId = param['chatId'];
      this.websocketService.emitEvent('join',this.chatId);
    });
    this.websocketService.outEvent.subscribe((msg) => {
      this.messages.push(msg);
      this.scrollToBottom();
    });
  }

  getControl() {
    return this.messageForm.get('message');
  }

  getError() {
    const keyError: string = Object.keys(this.getControl()!.errors!)[0];
    return Errors[keyError];
  }

  scrollToBottom(){
    setTimeout(()=>{
      const element=this.messagesBlock.nativeElement as HTMLElement;
      element.scrollTo({behavior:'smooth',top:element.scrollHeight});
    })
  }

  sendMessage() {
    if(this.messageForm.valid){
      const message: Message = {
        author: 'Yo',
        text: this.getControl()?.value,
        date: new Date(),
      };
      this.messages.push(message);
      this.websocketService.emitEvent('message',{ chatId: this.chatId, message: message });
      this.messageForm.reset(this.initValue, {emitEvent:false});
      this.scrollToBottom();
      return
    }
    this.getControl()!.updateValueAndValidity();
  }
}
