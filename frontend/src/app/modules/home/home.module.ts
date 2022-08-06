import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './components/chat/chat.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ChatSelectorComponent } from './components/chat/chat-selector/chat-selector.component';
import { ChatContentComponent } from './components/chat/chat-content/chat-content.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    ChatComponent,
    ChatSelectorComponent,
    ChatContentComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class HomeModule { }
