import { ConfigService } from '@nestjs/config'
import { ApiClient } from '@twurple/api'
import { EventSubListener, EnvPortAdapter } from '@twurple/eventsub'
import { NgrokAdapter } from '@twurple/eventsub-ngrok'

const listener = (apiClient: ApiClient, configService: ConfigService) => {
  const hostName = configService.get<string>('EXTERNAL_HOSTNAME')
  const secret = configService.get<string>('TWITCH_EVENTSUB_SECRET')
  const isLocal = Boolean(
    configService.get<string>('NODE_ENV') === 'development'
  )

  const adapter = isLocal
    ? new NgrokAdapter()
    : new EnvPortAdapter({ hostName })

  return new EventSubListener({
    apiClient,
    adapter,
    secret,
    strictHostCheck: true
  })
}

export default listener
