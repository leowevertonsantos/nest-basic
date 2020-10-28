import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlayersModule } from './players/players.module';

@Module({
  imports: [
    PlayersModule,
    MongooseModule.forRoot('mongodb+srv://smartranking:TRODZkhL1nuI2WkD@rankingnestjs.jidav.mongodb.net/test?retryWrites=true&w=majority'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
