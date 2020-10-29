import { ConflictException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreatePlayersDTO } from '../dtos/create-players.dto';
import * as uuid from 'uuid'
import { PlayersI } from '../interfaces/players.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class PlayersService {

    private readonly logger: Logger = new Logger(PlayersService.name);

    constructor(@InjectModel('Players') public readonly playersSchema: Model<PlayersI>) {

    }

    public async createPlayers(playerDTO: CreatePlayersDTO): Promise<void> {
        console.log(playerDTO);
        const playerFinded: PlayersI = await this.playersSchema.findOne({ email: playerDTO.email }).exec();

        if (playerFinded) {
            throw new ConflictException(`Exist players with email ${playerDTO.email} or cellPhone ${playerDTO.cellPhone} `);
            // await this.updatePlayer(playerDTO);
            // return;
        }
        await this.create(playerDTO);
    }

    private async create(playersDTO: CreatePlayersDTO): Promise<PlayersI> {

        const playerToCreate = new this.playersSchema(playersDTO);
        return await playerToCreate.save();
        // const { name, email, cellPhone } = playersDTO;
        // const player: PlayersI = {
        //     _id: uuid.v1(),
        //     name,
        //     email,
        //     cellPhone,
        //     ranking: 'A',
        //     rankingPosition: 1,
        //     urlPicture: 'www.google.com.br/foto123.jpg'
        // };
    }


    public async findAll(): Promise<PlayersI[]> {
        return await this.playersSchema.find();
    }

    public async findByEmail(email: string): Promise<PlayersI> {
        const player: PlayersI = await this.playersSchema.findOne({ email }).exec();
        if (!player) {
            throw new NotFoundException(`player not found with email: ${email}`);
        }
        return player;
    }

    public async updatePlayer(playerDTO: CreatePlayersDTO): Promise<PlayersI> {
        return await this.playersSchema.findOneAndUpdate({ email: playerDTO.email }, { $set: playerDTO }).exec();
    }


    public async deletePlayer(email: string): Promise<PlayersI> {
        const player: PlayersI = await this.playersSchema.findOneAndRemove({ email: email }).exec();

        if (!player) {
            throw new NotFoundException(`can't delete a play with email: ${email}. Player not found `);
        }
        return player;
    }


}
