import { ConfigService } from '@nestjs/config'
import { ApiClient } from '@twurple/api'
import { EventSubListener, ReverseProxyAdapter } from '@twurple/eventsub'
import { NgrokAdapter } from '@twurple/eventsub-ngrok'

const listener = (apiClient: ApiClient, configService: ConfigService) => {
  const secret = configService.get<string>('TWITCH_EVENTSUB_SECRET')
  const isLocal = Boolean(
    configService.get<string>('NODE_ENV') === 'development'
  )
  const port = Number(configService.get<string>('TWITCH_EVENTSUB_PORT')) || 8008
  const hostName = configService.get<string>('TWITCH_CALLBACK_HOSTNAME')

  const adapter = isLocal
    ? new NgrokAdapter()
    : new ReverseProxyAdapter({ hostName, port })

  return new EventSubListener({
    apiClient,
    adapter,
    secret,
    strictHostCheck: true
  })
}

export default listener
