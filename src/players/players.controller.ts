import { Body, Controller, Delete, Get, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreatePlayersDTO } from './dtos/create-players.dto';
import { UpdatePlayersDTO } from './dtos/update-players.dto';
import { PlayersI } from './interfaces/players.interface';
import { ValidatorParameter } from '../common/pipes/validator-parameter.pipe';
import { PlayersService } from './services/players.service';

@Controller('players')
export class PlayersController {

    constructor(
        private readonly playersService: PlayersService
    ) { }

    @Post()
    @UsePipes(ValidationPipe)
    public async createPlayer(@Body() playerDTO: CreatePlayersDTO): Promise<PlayersI> {
        return this.playersService.createPlayers(playerDTO);
    }

    @Get()
    public async findAllPlayers(): Promise<PlayersI[]> {
        return await this.playersService.findAll();
    }

    @Get('email')
    public async findPlayerByEmail(@Query('email', ValidatorParameter) email: string): Promise<PlayersI> {
        return await this.playersService.findByEmail(email);
    }

    @Get(':id')
    public async findPlayerById(@Param('id', ValidatorParameter) id: string): Promise<PlayersI> {
        return await this.playersService.findById(id);
    }

    @Put(':id')
    @UsePipes(ValidationPipe)
    public async updatePlayer(@Param('id', ValidatorParameter) id: string, @Body() playerDTO: UpdatePlayersDTO): Promise<PlayersI> {
        return await this.playersService.updatePlayer(id, playerDTO);
    }

    @Delete(':id')
    public async deletePlayer(@Param('id', ValidatorParameter) id: string): Promise<PlayersI> {
        return await this.playersService.deletePlayer(id);
    }
}
