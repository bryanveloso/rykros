import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { TwitchService } from './twitch.service'

@Module({
  imports: [ConfigModule],
  providers: [TwitchService]
})
export class TwitchModule {}
