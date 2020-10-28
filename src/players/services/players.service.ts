import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreatePlayersDTO } from '../dtos/create-players.dto';
import * as uuid from 'uuid'
import { PlayersI } from '../interfaces/players.interface';
import { throws } from 'assert';

@Injectable()
export class PlayersService {

    private readonly logger: Logger = new Logger(PlayersService.name);

    private players: PlayersI[] = [];

    public async createPlayers(playerDTO: CreatePlayersDTO): Promise<void> {

        const playerFinded: PlayersI = this.players.find(player => {
            return player.email === playerDTO.email;
        });

        if (playerFinded) {
            await this.updatePlayer(playerDTO);
            return;
        }
        await this.create(playerDTO);
    }

    private create(playersDTO: CreatePlayersDTO): void {
        const { name, email, cellPhone } = playersDTO;
        const player: PlayersI = {
            _id: uuid.v1(),
            name,
            email,
            cellPhone,
            ranking: 'A',
            rankingPosition: 1,
            urlPicture: 'www.google.com.br/foto123.jpg'
        };

        this.logger.log(`CreatePlayersDTO: ${JSON.stringify(playersDTO)}`);
        this.players.push(player);
    }


    public async findAll(): Promise<PlayersI[]> {
        return await this.players;
    }

    public findByEmail(email: string): PlayersI | Promise<PlayersI> {
        const player: PlayersI = this.players.find(player => player.email == email);
        if (!player) {
            throw new NotFoundException(`player not found with email: ${email}`);
        }
        return player;
    }

    public updatePlayer(playerDTO: CreatePlayersDTO): void {
        const indexPlayer: number = this.players.findIndex(player => {
            return player.email === playerDTO.email;
        });

        this.players[indexPlayer].name = playerDTO.name;
    }


    public deletePlayer(email: string): void | Promise<void> {
        const player: PlayersI = this.players.find(player => {
            return player.email === email;
        });

        if (!player) {
            throw new NotFoundException(`can't delete a play with email: ${email}. Player not found `);
        }
        this.players = this.players.filter(player => player.email !== email);
    }


}
