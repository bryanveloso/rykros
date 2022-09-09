import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { TwitchGateway } from './twitch.gateway'
import { TwitchService } from './twitch.service'

@Module({
  imports: [ConfigModule],
  providers: [TwitchService, TwitchGateway]
})
export class TwitchModule {}
