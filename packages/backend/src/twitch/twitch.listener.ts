import { ConfigService } from '@nestjs/config'
import { ApiClient } from '@twurple/api'
import { EventSubListener, EnvPortAdapter } from '@twurple/eventsub'
import { NgrokAdapter } from '@twurple/eventsub-ngrok'

const listener = (apiClient: ApiClient, configService: ConfigService) => {
  const secret = configService.get<string>('TWITCH_EVENTSUB_SECRET')
  const isLocal = Boolean(
    configService.get<string>('NODE_ENV') === 'development'
  )

  // Since we're using Render, we'll be "hardcoding" this.
  const hostName = configService.get<string>('RENDER_EXTERNAL_HOSTNAME')

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
