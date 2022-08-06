import { Component, OnInit } from '@angular/core';
import { Chat } from 'app/models/chat';

@Component({
  selector: 'app-chat-selector',
  templateUrl: './chat-selector.component.html',
  styleUrls: ['./chat-selector.component.scss']
})
export class ChatSelectorComponent implements OnInit {

  chats: Chat[];

  constructor() {
    this.chats = [
      {
        title: 'JS - de 0 a 100',
        description: 'Consultas del lenguaje Js',
        img: '/assets/img/js.png',
        id: 'socket-js',
      },
      {
        title: 'Python para Dummies',
        description: 'Introduccion y preguntas frecuentes',
        img: '/assets/img/python.png',
        id: 'socket-python',
      },
      {
        title: 'Memes',
        description: 'Keep calm & share some memes',
        img: '/assets/img/memes.png',
        id: 'socket-memes',
      },
      {
        title: 'Oficina',
        description: 'Organizacion del grupo de trabajo',
        img: '/assets/img/oficina.png',
        id: 'socket-oficina',
      },
    ];
  }

  ngOnInit(): void {
  }

}
