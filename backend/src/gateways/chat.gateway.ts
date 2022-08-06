import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { Payload } from "src/models/payload";

// INDICAMOS EL PUERTO QUE VAMOS A UTILIZAR PARA REALIZAR 
// LAS CONEXIONES CON SOCKET.IO (EN ESTE CASO DEJAMOS EL 81)
@WebSocketGateway(81,{cors:{origin:"http://localhost:4200"}})
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect{

    // TIPO SERVER DE SOCKET.IO
    @WebSocketServer() server:Server
    
    afterInit(server: any) {
        console.log("Esto se ejecuta cuando inicia el servicio");
    }
    
    handleConnection(client: Socket, ...args: any[]) {
        console.log("Esto se ejecuta cuando alguien se conecta 👌👌👌");
    }

    handleDisconnect(client: any) {
        console.log("Alguien se desconecto");
    }

    // EVENTO DE CONEXION AL GRUPO/SALA
    @SubscribeMessage('join')
    handleJoin(client:Socket,chatId:string){
        console.log(`Cliente ${client.id} se unió a la sala ${chatId} 💻`);
        client.join(chatId);
    }

    // CAPTURA DE MENSAJES Y EMISION BROADCAST
    @SubscribeMessage('message')
    handleIncommingMessage(client:Socket,payload:Payload){
        console.log(payload);
        payload.message.author=client.id;
        client.broadcast.to(payload.chatId).emit('new_message',payload.message);
        // this.server.to(payload.chatId).emit('new_message',payload.message)
    }

    // EVENTO DE DESCONEXION DE SALA
    @SubscribeMessage('leave')
    handleLeave(client:Socket,chatId:string){
        console.log(`Cliente ${client.id} abandonó la sala ${chatId} 😥`);
        client.leave(chatId);
    }

}
