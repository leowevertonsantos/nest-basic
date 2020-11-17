import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './services/categories.service';
import { CategoriesSchema } from './schemas/categories.schema';
import { PlayersModule } from 'src/players/players.module';

@Module({
  imports: [
    PlayersModule,
    MongooseModule.forFeature([
      {
        name: 'Category', schema: CategoriesSchema
      }
    ])
  ],
  controllers: [CategoriesController],
  providers: [CategoriesService],
  exports: [CategoriesService]
})
export class CategoriesModule { }
