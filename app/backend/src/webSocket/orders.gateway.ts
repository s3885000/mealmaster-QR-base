import { SubscribeMessage, WebSocketGateway, OnGatewayConnection, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({ cors: {
  origin: "http://localhost:3001",
  methods: ["GET", "POST"],
  allowedHeaders: ["my-custom-header"],
  credentials: true
}})
export class OrdersGateway implements OnGatewayConnection {

  @WebSocketServer()
  private server: Server;

  handleConnection(client: any, ...args: any[]) {
    console.log('Client connected:', client.id);
  }

  @SubscribeMessage('joinRoom')
  handleJoinRoom(client: any, payload: { roomId: string }) {
      console.log('Client is attempting to join room:', payload.roomId);
      client.join(payload.roomId);
      console.log('Client has joined room:', payload.roomId);
      client.emit('joinedRoom', payload.roomId);
  }

  updateOrderStatus(userId: string, orderId: string, status: string) {
      console.log(`Emitting orderStatusUpdate to room ${userId} for order ${orderId} with status ${status}`);
      this.server.to(userId).emit('orderStatusUpdate', { orderId, status });
  }

}

