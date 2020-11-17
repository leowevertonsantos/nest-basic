import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriesModule } from 'src/categories/categories.module';
import { PlayersModule } from 'src/players/players.module';
import { ChallengeController } from './challenge.controller';
import { ChallengeSchema } from './schemas/challenge.schema';
import { ChallengeService } from './services/challenge.service';
import { MatchSchema } from './schemas/match.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Challenge', schema: ChallengeSchema },
      { name: 'Match', schema: MatchSchema }
    ]),
    PlayersModule,
    CategoriesModule
  ],

  controllers: [ChallengeController],
  providers: [ChallengeService]
})
export class ChallengeModule { }
