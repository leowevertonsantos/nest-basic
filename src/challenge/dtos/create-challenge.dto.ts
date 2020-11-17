import { ArrayMaxSize, ArrayMinSize, IsArray, IsDateString, IsNotEmpty } from "class-validator";
import { PlayersI } from "src/players/interfaces/players.interface";

export class CreateChallengeDto {

    @IsNotEmpty()
    @IsDateString()
    dateHourChallenge: Date;

    @IsNotEmpty()
    requester: PlayersI;

    @IsArray()
    @ArrayMinSize(2)
    @ArrayMaxSize(2)
    players: Array<PlayersI>;
}