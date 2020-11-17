import { IsNotEmpty } from "class-validator"
import { PlayersI } from "src/players/interfaces/players.interface"
import { Result } from "../interfaces/challenge.interface"

export class AddMatchChallenge {

    @IsNotEmpty()
    def: PlayersI

    @IsNotEmpty()
    resultado: Array<Result>

}
