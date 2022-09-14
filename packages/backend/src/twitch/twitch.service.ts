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
    await Promise.all([
      this.subscribeToChannelFollowEvents(this.channelId),
      this.subscribeToChannelSubscriptionEvents(this.channelId),
      this.subscribeToChannelSubscriptionGiftEvents(this.channelId),
      this.subscribeToChannelSubscriptionMessageEvents(this.channelId),
      this.subscribeToChannelRaidEventsTo(this.channelId)
    ])

    this.logger.log(`TwitchService dependencies initialized`)
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

  async subscribeToChannelFollowEvents(userId: string) {
    return this.listener.subscribeToChannelFollowEvents(userId, async e => {
      const payload = await utils.processChannelFollowEvent(e)
      this.gateway.sendNotification(payload)
    })
  }

  async subscribeToChannelSubscriptionEvents(userId: string) {
    return this.listener.subscribeToChannelSubscriptionEvents(
      userId,
      async e => {
        const payload = await utils.processChannelSubscriptionEvent(e)
        this.gateway.sendNotification(payload)
      }
    )
  }

  async subscribeToChannelSubscriptionGiftEvents(userId: string) {
    return this.listener.subscribeToChannelSubscriptionGiftEvents(
      userId,
      async e => {
        const payload = await utils.processChannelSubscriptionGiftEvent(e)
        this.gateway.sendNotification(payload)
      }
    )
  }

  async subscribeToChannelSubscriptionMessageEvents(userId: string) {
    return this.listener.subscribeToChannelSubscriptionMessageEvents(
      userId,
      async e => {
        const payload = await utils.processChannelSubscriptionMessageEvent(e)
        this.gateway.sendNotification(payload)
      }
    )
  }

  async subscribeToChannelRaidEventsTo(userId: string) {
    return this.listener.subscribeToChannelRaidEventsTo(userId, async e => {
      const payload = await utils.processChannelRaidEventTo(e)
      this.gateway.sendNotification(payload)
    })
  }
}
