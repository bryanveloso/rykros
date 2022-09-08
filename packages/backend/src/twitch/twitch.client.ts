import { ConfigService } from '@nestjs/config'
import { ApiClient } from '@twurple/api'
import { ClientCredentialsAuthProvider } from '@twurple/auth'

const client = (configService: ConfigService) => {
  const clientId = configService.get<string>('TWITCH_CLIENT_ID')
  const clientSecret = configService.get<string>('TWITCH_CLIENT_SECRET')

  const authProvider = new ClientCredentialsAuthProvider(clientId, clientSecret)

  return new ApiClient({ authProvider })
}

export default client
