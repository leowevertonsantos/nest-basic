import { Body, Controller, Post } from '@nestjs/common';
import { CreatePlayersDTO } from './dtos/create-players.dto';

@Controller('players')
export class PlayersController {

    @Post()
    public async createPlayer(@Body() player: CreatePlayersDTO) {
        return JSON.stringify(
            {
                name: 'Léo'
            }
        );
    }
}
