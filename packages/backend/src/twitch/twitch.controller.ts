import { Inject, Param } from '@nestjs/common'
import { TwitchService } from './twitch.service'

export class TwitchController {
  constructor(@Inject('LISTENER') private twitchSerivce: TwitchService) {}

  async unsubscribe(@Param() params: { id: string }) {
    return this.twitchSerivce.unsubscribe(params.id)
  }

  async getAllSubscriptions() {
    const subscriptions = await this.twitchSerivce.getAllSubscriptions()
    return subscriptions.data.map(sub => sub.id)
  }

  async unsubscribeAll() {
    return this.twitchSerivce.unsubscribeAll()
  }
}
