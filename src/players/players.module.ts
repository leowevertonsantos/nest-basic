import { Module, Post } from '@nestjs/common';
import { PlayersController } from './players.controller';

@Module({
  controllers: [PlayersController]
})
export class PlayersModule {


}
