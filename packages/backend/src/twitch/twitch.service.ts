import { Injectable, Logger, OnModuleDestroy } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ApiClient } from '@twurple/api'
import { EventSubListener } from '@twurple/eventsub'

import TwitchClient from './twitch.client'
import { TwitchGateway } from './twitch.gateway'
import TwitchListener from './twitch.listener'
import * as utils from './twitch.listener.utils'

@Injectable()
export class TwitchService implements OnModuleDestroy {
  private readonly logger = new Logger(TwitchService.name)
  private channelId: string

  private apiClient: ApiClient
  private listener: EventSubListener

  constructor(
    private readonly configService: ConfigService,
    private readonly gateway: TwitchGateway
  ) {
    const apiClient = TwitchClient(configService)
    const listener = TwitchListener(apiClient, configService)

    this.apiClient = apiClient
    this.listener = listener
  }

  async init(channelId: string): Promise<void> {
    this.channelId = channelId

    this.logger.log(`Connecting to EventSub`)
    await this.unsubscribeAll()
    await this.listener.listen()

    this.logger.log(`Subscribing to channel events`)
    await this.subscribeToChannelSubscriptionEvents(this.channelId)
    await this.subscribeToChannelSubscriptionMessageEvents(this.channelId)
  }

  async onModuleDestroy(): Promise<void> {
    // We need to make sure all past subscriptions are deleted so the
    // Twitch API doesn't yell at us when we reinitialize.
    await this.unsubscribeAll()
  }

  async unsubscribe(subscriptionId: string) {
    return this.apiClient.eventSub.deleteSubscription(subscriptionId)
  }

  async getAllSubscriptions() {
    return this.apiClient.eventSub.getSubscriptions()
  }

  async unsubscribeAll() {
    return this.apiClient.eventSub.deleteAllSubscriptions()
  }

  // Individual subscriptions.

  async subscribeToChannelSubscriptionEvents(userId: string) {
    const listener = await this.listener.subscribeToChannelSubscriptionEvents(
      userId,
      async e => {
        const payload = await utils.processChannelSubscriptionEvent(e)
        // this.logger.log(
        //   `[${e.broadcasterName}] ${e.userDisplayName} subscribed`
        // )
        this.gateway.sendNotification(payload)
      }
    )
    console.log(await listener.getCliTestCommand())
    return listener
  }

  async subscribeToChannelSubscriptionMessageEvents(userId: string) {
    return this.listener.subscribeToChannelSubscriptionMessageEvents(
      userId,
      async e => {
        this.logger.log(e)
        this.gateway.sendNotification(e)
      }
    )
  }
}
