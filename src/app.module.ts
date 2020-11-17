import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlayersModule } from './players/players.module';
import { CategoriesModule } from './categories/categories.module';
import { ChallengeModule } from './challenge/challenge.module';

@Module({
  imports: [
    PlayersModule,
    MongooseModule.forRoot(
      'mongodb+srv://smartranking:TRODZkhL1nuI2WkD@rankingnestjs.jidav.mongodb.net/ranking?retryWrites=true&w=majority',
      {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false
      }
    ),
    CategoriesModule,
    ChallengeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
