import { Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ApiClient } from '@twurple/api/lib'
import { EventSubListener } from '@twurple/eventsub/lib'

import TwitchClient from './twitch.client'
import TwitchListener from './twitch.listener'

@Injectable()
export class TwitchService {
  private readonly logger = new Logger(TwitchService.name)
  private apiClient: ApiClient
  private listener: EventSubListener

  constructor(private configService: ConfigService) {
    const apiClient = TwitchClient(configService)
    const listener = TwitchListener(apiClient, configService)

    this.apiClient = apiClient
    this.listener = listener
  }

  async init() {
    await this.listener.listen()
  }

  async unsubscribe(subscriptionId: string) {
    return this.apiClient.eventSub.deleteSubscription(subscriptionId)
  }

  async getAllSubscriptions() {
    return this.apiClient.eventSub.getSubscriptions()
  }

  async unsubscribeAll() {
    await this.apiClient.eventSub.deleteAllSubscriptions()
  }
}
