import { ConflictException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreatePlayersDTO } from '../dtos/create-players.dto';
import * as uuid from 'uuid'
import { PlayersI } from '../interfaces/players.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdatePlayersDTO } from '../dtos/update-players.dto';

@Injectable()
export class PlayersService {

    private readonly logger: Logger = new Logger(PlayersService.name);

    constructor(@InjectModel('Players') public readonly playersModel: Model<PlayersI>) {

    }

    public async createPlayers(playerDTO: CreatePlayersDTO): Promise<PlayersI> {
        const playerFinded: PlayersI = await this.playersModel.findOne({ email: playerDTO.email }).exec();

        if (playerFinded) {
            throw new ConflictException(`Exist players with email ${playerDTO.email} or cellPhone ${playerDTO.cellPhone} `);
        }

        const playerToCreate = new this.playersModel(playerDTO);
        return await playerToCreate.save();
    }

    public async findAll(): Promise<PlayersI[]> {
        return await this.playersModel.find();
    }

    public async findByEmail(email: string): Promise<PlayersI> {
        const player: PlayersI = await this.playersModel.findOne({ email }).exec();
        if (!player) {
            throw new NotFoundException(`player not found with email: ${email}`);
        }
        return player;
    }

    public async updatePlayer(_id: string, playerDTO: UpdatePlayersDTO): Promise<PlayersI> {
        const playerUpdated: PlayersI = await this.playersModel.findOneAndUpdate({ _id }, { $set: playerDTO }).exec();

        if (!playerUpdated) {
            throw new NotFoundException(`player not found with id: ${_id}`);
        }
        return playerUpdated;
    }


    public async deletePlayer(_id: string): Promise<PlayersI> {
        const player: PlayersI = await this.playersModel.findOneAndRemove({ _id }).exec();

        if (!player) {
            throw new NotFoundException(`can't delete a play with id: ${_id}. Player not found `);
        }
        return player;
    }

    public async findById(_id: string): Promise<PlayersI> {
        const player: PlayersI = await this.playersModel.findById(_id);

        if (!player) {
            throw new NotFoundException(`id: ${_id}. Player not found `);
        }
        return player;
    }
}
