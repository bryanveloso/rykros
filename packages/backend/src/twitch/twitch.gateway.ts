import { WebSocketGateway } from '@nestjs/websockets';
import { TwitchService } from './twitch.service';

@WebSocketGateway()
export class TwitchGateway {
  constructor(private readonly twitchService: TwitchService) {}
}
