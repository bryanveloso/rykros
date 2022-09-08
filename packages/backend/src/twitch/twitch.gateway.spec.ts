import { Test, TestingModule } from '@nestjs/testing';
import { TwitchGateway } from './twitch.gateway';
import { TwitchService } from './twitch.service';

describe('TwitchGateway', () => {
  let gateway: TwitchGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TwitchGateway, TwitchService],
    }).compile();

    gateway = module.get<TwitchGateway>(TwitchGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
