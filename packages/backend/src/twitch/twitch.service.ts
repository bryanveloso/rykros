import { Injectable, Logger } from '@nestjs/common'

@Injectable()
export class TwitchService {
  private readonly logger = new Logger(TwitchService.name)
}
