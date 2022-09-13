import { Logger } from '@nestjs/common'
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets'
import { Server, WebSocket } from 'ws'

@WebSocketGateway({
  cors: {
    origin: '*'
  }
})
export class TwitchGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
  @WebSocketServer() server: Server
  private readonly logger = new Logger(`${TwitchGateway.name}`)

  afterInit(server: Server) {
    this.logger.log('WebSocketServer initialized')
  }

  handleConnection(client: WebSocket, ...args: any[]) {
    this.logger.log(`Client connected: ${client}`)
  }

  handleDisconnect(client: WebSocket) {
    this.logger.log(`Client disconnected: ${client}`)
  }

  sendNotification(notification: any): void {
    this.logger.debug(notification)
    this.server.clients.forEach(client => {
      client.send(notification)
    })
  }
}
