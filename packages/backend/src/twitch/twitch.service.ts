import { Injectable, Logger, OnModuleDestroy } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ApiClient } from '@twurple/api/lib'
import { EventSubListener } from '@twurple/eventsub/lib'

import TwitchClient from './twitch.client'
import TwitchListener from './twitch.listener'
import { TwitchGateway } from './twitch.gateway'

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

    this.subscribeToChannelSubscriptionEvents(this.channelId)
    this.subscribeToChannelSubscriptionMessageEvents(this.channelId)
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
    await this.apiClient.eventSub.deleteAllSubscriptions()
  }

  async subscribeToChannelSubscriptionEvents(userId: string) {
    const listener = await this.listener.subscribeToChannelSubscriptionEvents(
      userId,
      async e => {
        this.logger.log(e)
        this.gateway.sendNotification(e)
      }
    )
    const command = await listener.getCliTestCommand()
    this.logger.log(command)
  }

  async subscribeToChannelSubscriptionMessageEvents(userId: string) {
    const listener =
      await this.listener.subscribeToChannelSubscriptionMessageEvents(
        userId,
        async e => {
          this.logger.log(e)
          this.gateway.sendNotification(e)
        }
      )
    const command = await listener.getCliTestCommand()
    this.logger.log(command)
  }
}
