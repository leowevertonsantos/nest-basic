import { Body, Controller, Delete, Get, Logger, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { AddMatchChallenge } from './dtos/add-match-challenge';
import { CreateChallengeDto } from './dtos/create-challenge.dto';
import { UpdateChallengeDto } from './dtos/update-challenge.dto';
import { Challenge } from './interfaces/challenge.interface';
import { ChallengeStatusValidatorPipe } from './pipes/challenge-status-validator.pipe';
import { ChallengeService } from './services/challenge.service';

@Controller('challenges')
export class ChallengeController {
    private readonly Logger: Logger = new Logger(ChallengeController.name);

    constructor(private readonly challengeService: ChallengeService) { }

    @Post()
    @UsePipes(ValidationPipe)
    async createChallenge(
        @Body() createChallengeDto: CreateChallengeDto): Promise<Challenge> {
        this.Logger.log(`createChallengeDto: ${JSON.stringify(createChallengeDto)}`)
        return await this.challengeService.createChallenge(createChallengeDto)
    }

    @Get()
    async findChallengeOfPlayer(
        @Query('playerId') _id: string): Promise<Array<Challenge>> {
        return _id ? await this.challengeService.findChallengeOfPlayer(_id)
            : await this.challengeService.findAll()
    }

    @Put('/:challenge')
    async updateChallenge(
        @Body(ChallengeStatusValidatorPipe) atualizarchallengeDto: UpdateChallengeDto,
        @Param('challenge') _id: string): Promise<void> {
        await this.challengeService.updateChallenge(_id, atualizarchallengeDto)

    }

    @Post('/:challenge/match/')
    async addMatchToChallenge(
        @Body(ValidationPipe) atribuirchallengematchDto: AddMatchChallenge,
        @Param('challenge') _id: string): Promise<void> {
        return await this.challengeService.addMatchToChallenge(_id, atribuirchallengematchDto)
    }

    @Delete('/:_id')
    async deleteChallenge(
        @Param('_id') _id: string): Promise<void> {
        await this.challengeService.deleteChallenge(_id)
    }



}
