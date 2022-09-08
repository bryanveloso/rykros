import { Module } from '@nestjs/common';
import { TwitchService } from './twitch.service';
import { TwitchGateway } from './twitch.gateway';

@Module({
  providers: [TwitchGateway, TwitchService]
})
export class TwitchModule {}
