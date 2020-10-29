import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlayersController } from './players.controller';
import { PlayersSchema } from './schemas/players.schema';
import { PlayersService } from './services/players.service';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        { name: 'Players', schema: PlayersSchema }
      ])
  ],
  controllers: [PlayersController],
  providers: [PlayersService]
})
export class PlayersModule {


}
