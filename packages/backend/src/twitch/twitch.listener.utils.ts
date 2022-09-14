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
    broadcasterName,
    followDate,
    userDisplayName,
    userId,
    userName
  } = event
  const payload = {
    type: 'channel.follow',
    data: {
      broadcasterDisplayName,
      broadcasterId,
      broadcasterName,
      followDate,
      userDisplayName,
      userId,
      userName
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
    broadcasterName,
    isGift,
    tier,
    userDisplayName,
    userId,
    userName
  } = event
  const payload = {
    type: 'channel.subscribe',
    data: {
      broadcasterDisplayName,
      broadcasterId,
      broadcasterName,
      isGift,
      tier,
      userDisplayName,
      userId,
      userName
    }
  }

  return payload
}

export const processChannelSubscriptionGiftEvent = async (
  event: EventSubChannelSubscriptionGiftEvent
) => {
  const {
    amount,
    broadcasterDisplayName,
    broadcasterId,
    broadcasterName,
    cumulativeAmount,
    gifterDisplayName,
    gifterId,
    gifterName,
    isAnonymous,
    tier
  } = event
  const payload = {
    type: 'channel.subscription.gift',
    data: {
      amount,
      broadcasterDisplayName,
      broadcasterId,
      broadcasterName,
      cumulativeAmount,
      gifterDisplayName,
      gifterId,
      gifterName,
      isAnonymous,
      tier
    }
  }

  return payload
}

export const processChannelSubscriptionMessageEvent = async (
  event: EventSubChannelSubscriptionMessageEvent
) => {
  const {
    broadcasterDisplayName,
    broadcasterId,
    broadcasterName,
    cumulativeMonths,
    durationMonths,
    messageText,
    streakMonths,
    tier,
    userDisplayName,
    userId,
    userName
  } = event
  const payload = {
    type: 'channel.subscription.message',
    data: {
      broadcasterDisplayName,
      broadcasterId,
      broadcasterName,
      cumulativeMonths,
      durationMonths,
      messageText,
      streakMonths,
      tier,
      userDisplayName,
      userId,
      userName
    }
  }

  return payload
}

export const processChannelCheerEvent = async (
  event: EventSubChannelCheerEvent
) => {
  const {
    bits,
    broadcasterDisplayName,
    broadcasterId,
    broadcasterName,
    isAnonymous,
    message,
    userDisplayName,
    userId,
    userName
  } = event
  const payload = {
    type: 'channel.cheer',
    data: {
      bits,
      broadcasterDisplayName,
      broadcasterId,
      broadcasterName,
      isAnonymous,
      message,
      userDisplayName,
      userId,
      userName
    }
  }

  return payload
}

export const processChannelRaidEventTo = async (
  event: EventSubChannelRaidEvent
) => {
  const {
    raidedBroadcasterDisplayName,
    raidedBroadcasterId,
    raidedBroadcasterName,
    raidingBroadcasterDisplayName,
    raidingBroadcasterId,
    raidingBroadcasterName,
    viewers
  } = event
  const payload = {
    type: 'channel.raid',
    data: {
      raidedBroadcasterDisplayName,
      raidedBroadcasterId,
      raidedBroadcasterName,
      raidingBroadcasterDisplayName,
      raidingBroadcasterId,
      raidingBroadcasterName,
      viewers
    }
  }

  return payload
}
