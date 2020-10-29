import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreatePlayersDTO } from './dtos/create-players.dto';
import { PlayersI } from './interfaces/players.interface';
import { PlayersService } from './services/players.service';

@Controller('players')
export class PlayersController {

    constructor(
        private readonly playersService: PlayersService
    ) { }

    @Post()
    public async createPlayer(@Body() playerDTO: CreatePlayersDTO): Promise<void> {

        await this.playersService.createPlayers(playerDTO);

    }

    @Get()
    public async findAllPlayers(): Promise<PlayersI[]> {
        return await this.playersService.findAll();
    }

    @Get(':email')
    public async findPlayerByEmail(@Param('email') email: string): Promise<PlayersI> {
        return await this.playersService.findByEmail(email);
    }

    @Delete(':email')
    public async deletePlayer(@Param('email') email: string): Promise<PlayersI> {
        return await this.playersService.deletePlayer(email);
    }
}
