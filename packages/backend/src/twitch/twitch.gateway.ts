import { Logger } from '@nestjs/common'
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets'
import { Server, WebSocket } from 'ws'

import { TwitchService } from './twitch.service'

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

  sendNotification(notification: string): void {
    this.logger.debug(notification)
    this.server.emit('notification', notification)
  }

  afterInit(server: Server) {
    this.logger.log('Init')
  }

  handleConnection(client: WebSocket, ...args: any[]) {
    this.logger.log(`Client connected: ${client}`)
  }

  handleDisconnect(client: WebSocket) {
    this.logger.log(`Client disconnected: ${client}`)
  }
}
