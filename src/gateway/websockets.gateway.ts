
import { SubscribeMessage, WebSocketGateway, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect, WebSocketServer } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';

@WebSocketGateway({cors:true})
export class WebsocketsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  private clients: Set<Socket> = new Set();

  @WebSocketServer() server: Server;

  afterInit(server: Server): void  {
    console.log('WebSocket Gateway initialized');
  }

  handleConnection(client: Socket): void  {
    console.log(`Client connected: ${client.id}`);
    this.clients.add(client);
  }

  handleDisconnect(client: Socket): void  {
    console.log(`Client disconnected: ${client.id}`);
    this.clients.delete(client);
  }

  broadcastMessage(message: any): void {
    // Invia il messaggio in broadcast a tutti i client connessi
    this.server.emit('broadcastMessage', message);
  }
}