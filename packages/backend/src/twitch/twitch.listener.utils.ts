import {
  EventSubChannelCheerEvent,
  EventSubChannelFollowEvent,
  EventSubChannelRaidEvent,
  EventSubChannelSubscriptionEvent,
  EventSubChannelSubscriptionGiftEvent,
  EventSubChannelSubscriptionMessageEvent
} from '@twurple/eventsub'

export const processChannelFollowEvent = async (
  event: EventSubChannelFollowEvent
) => {
  const {
    broadcasterDisplayName,
    broadcasterId,
    followDate,
    userDisplayName,
    userId
  } = event
  const payload = {
    type: 'channel.follow',
    data: {
      broadcasterDisplayName,
      broadcasterId,
      followDate,
      userDisplayName,
      userId
    }
  }

  return payload
}

export const processChannelSubscriptionEvent = async (
  event: EventSubChannelSubscriptionEvent
) => {
  const {
    broadcasterDisplayName,
    broadcasterId,
    isGift,
    tier,
    userDisplayName,
    userId
  } = event
  const payload = {
    type: 'channel.subscribe',
    data: {
      broadcasterDisplayName,
      broadcasterId,
      isGift,
      tier,
      userDisplayName,
      userId
    }
  }

  return payload
}

export const processChannelSubscriptionGiftEvent = async (
  event: EventSubChannelSubscriptionGiftEvent
) => {
  const {} = event
  const payload = {
    type: 'channel.subscription.gift'
  }

  return payload
}

export const processChannelSubscriptionMessageEvent = async (
  event: EventSubChannelSubscriptionMessageEvent
) => {
  const {} = event
  const payload = {
    type: 'channel.subscription.message'
  }

  return payload
}

export const processChannelCheerEvent = async (
  event: EventSubChannelCheerEvent
) => {
  const {} = event
  const payload = {
    type: 'channel.cheer'
  }

  return payload
}

export const processChannelRaidEvent = async (
  event: EventSubChannelRaidEvent
) => {
  const {} = event
  const payload = {
    type: 'channel.raid'
  }

  return payload
}
