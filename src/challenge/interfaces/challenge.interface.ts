import { Document } from "mongoose";
import { PlayersI } from "src/players/interfaces/players.interface";
import { ChallengeStatus } from "./challenge-status.enum";

export interface Challenge extends Document {

    dateHourChallenge: Date;
    status: ChallengeStatus;
    dateHourSolicitation: Date;
    dateHourAnswer: Date;
    requester: PlayersI;
    category: string;
    players: Array<PlayersI>;
    match: Match;
}

export interface Match extends Document {
    category: string;
    players: Array<PlayersI>;
    def: PlayersI;
    result: Array<Result>;
}

export interface Result {
    set: string;
}
