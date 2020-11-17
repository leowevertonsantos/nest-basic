import { Document } from "mongoose";
import { PlayersI } from "src/players/interfaces/players.interface";
import { EventsI } from "./events.interfaces";

export interface CategoriesI extends Document {
    readonly category: string;
    description: string;
    events: Array<EventsI>;
    players: Array<PlayersI>;
}