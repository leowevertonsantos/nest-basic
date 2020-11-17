import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CategoriesI } from 'src/categories/interfaces/categories.interfaces';
import { CategoriesService } from 'src/categories/services/categories.service';
import { PlayersI } from 'src/players/interfaces/players.interface';
import { PlayersService } from 'src/players/services/players.service';
import { AddMatchChallenge } from '../dtos/add-match-challenge';
import { CreateChallengeDto } from '../dtos/create-challenge.dto';
import { UpdateChallengeDto } from '../dtos/update-challenge.dto';
import { ChallengeStatus } from '../interfaces/challenge-status.enum';
import { Challenge, Match } from '../interfaces/challenge.interface';

@Injectable()
export class ChallengeService {

    private readonly Logger: Logger = new Logger(ChallengeService.name);

    constructor(
        @InjectModel('Challenge') private readonly challengeModel: Model<Challenge>,
        @InjectModel('Match') private readonly matchModel: Model<Match>,
        private readonly playersService: PlayersService,
        private readonly categoriesService: CategoriesService) { }

    private readonly logger = new Logger(ChallengeService.name)

    async createChallenge(createChallengeDto: CreateChallengeDto): Promise<Challenge> {

        const players = await this.playersService.findAll();
        console.log(players);
        console.log(createChallengeDto.players);
        createChallengeDto.players.map(playerDTO => {
            const playerFilter = players.filter(player => player._id == playerDTO._id);

            if (playerFilter.length == 0) {
                throw new BadRequestException(`Id ${playerDTO._id} isnt a player!`);
            }

        })


        const requesterPlayerOfMatch = await createChallengeDto.players.filter(player => player._id == createChallengeDto.requester._id)

        this.logger.log(`requesterPlayerOfMatch: ${requesterPlayerOfMatch}`)

        if (requesterPlayerOfMatch.length == 0) {
            throw new BadRequestException(`The player should be a player of the match!`)
        }


        const playerCategory: CategoriesI = await this.categoriesService.findCategoryByPlayer(createChallengeDto.requester._id);

        if (!playerCategory) {
            throw new BadRequestException(`The Player requester should be registered in category!`);
        }

        const ChallengeCreate = new this.challengeModel(createChallengeDto);
        ChallengeCreate.category = playerCategory.category;
        ChallengeCreate.dateHourSolicitation = new Date();


        ChallengeCreate.status = ChallengeStatus.PENDING;
        this.logger.log(`ChallengeCreate: ${JSON.stringify(ChallengeCreate)}`);
        return await ChallengeCreate.save();

    }

    async findAll(): Promise<Array<Challenge>> {
        return await this.challengeModel.find()
            .populate("requester")
            .populate("players")
            .populate("match")
            .exec()
    }

    async findChallengeOfPlayer(_id: string): Promise<Array<Challenge>> {

        const players: PlayersI[] = await this.playersService.findAll();

        const playerFilter = players.filter(player => player._id == _id)

        if (playerFilter.length == 0) {
            throw new BadRequestException(`Id ${_id} isnt a player!`)
        }

        return await this.challengeModel.find()
            .where('players')
            .in([_id])
            .populate("requester")
            .populate("players")
            .populate("match")
            .exec()

    }

    async updateChallenge(_id: string, updateChallengeDTO: UpdateChallengeDto): Promise<void> {

        const challengeFinded = await this.challengeModel.findById(_id).exec()

        if (!challengeFinded) {
            throw new NotFoundException(`Challenge ${_id} not found!`)
        }

        /*
        Atualizaremos a data da resposta quando o status do Challenge vier preenchido 
        */
        if (updateChallengeDTO.status) {
            challengeFinded.dateHourAnswer = new Date()
        }
        challengeFinded.status = updateChallengeDTO.status
        challengeFinded.dateHourChallenge = updateChallengeDTO.dateHourChallenge

        await this.challengeModel.findOneAndUpdate({ _id }, { $set: challengeFinded }).exec()

    }

    async addMatchToChallenge(_id: string, addMatchToChallenge: AddMatchChallenge): Promise<void> {

        const challengeFinded = await this.challengeModel.findById(_id).exec()

        if (!challengeFinded) {
            throw new BadRequestException(`Challenge ${_id} not found!`)
        }

        /*
       Verificar se o player vencedor faz parte do Challenge
       */
        const playerFilter = challengeFinded.players.filter(player => player._id == addMatchToChallenge.def)

        this.logger.log(`challengeFinded: ${challengeFinded}`)
        this.logger.log(`playerFilter: ${playerFilter}`)

        if (playerFilter.length == 0) {
            throw new BadRequestException(`The player that win isnt a match on player`)
        }


        const matchCreated = new this.matchModel(addMatchToChallenge)


        matchCreated.category = challengeFinded.category


        matchCreated.players = challengeFinded.players

        const resultado = await matchCreated.save()


        challengeFinded.status = ChallengeStatus.DONE

        challengeFinded.match = resultado._id

        try {
            await this.challengeModel.findOneAndUpdate({ _id }, { $set: challengeFinded }).exec()

        } catch (error) {
            await this.matchModel.deleteOne({ _id: resultado._id }).exec();
            throw new InternalServerErrorException();
        }
    }

    async deleteChallenge(_id: string): Promise<void> {

        const challengeFinded = await this.challengeModel.findById(_id).exec()

        if (!challengeFinded) {
            throw new BadRequestException(`Challenge ${_id} not found!`)
        }

        challengeFinded.status = ChallengeStatus.CANCEL

        await this.challengeModel.findOneAndUpdate({ _id }, { $set: challengeFinded }).exec()

    }

}
