import { Logger, Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { TwitchModule } from './twitch/twitch.module'
import { TwitchService } from './twitch/twitch.service'

@Module({
  imports: [ConfigModule.forRoot(), TwitchModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {
  private readonly logger = new Logger(AppModule.name)

  constructor(
    private configService: ConfigService,
    private twitchService: TwitchService
  ) {
    const channelId = configService.get<string>('TWITCH_CHANNEL_ID')
    if (!channelId)
      throw new Error('No TWITCH_CHANNEL_ID specified in the .env file!')

    this.logger.log('Initializing Rykros')
    twitchService.init(channelId)
  }
}
