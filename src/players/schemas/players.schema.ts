import { Schema } from "@nestjs/mongoose";
import * as mongoose from "mongoose";

export const PlayersSchema = new mongoose.Schema(
    {
        cellPhone: { type: String, unique: true },
        email: { type: String, unique: true },
        name: { type: String },
        ranking: { type: String },
        rankingPosition: { type: Number },
        urlPicture: { type: String }
    },
    {
        timestamps: true,
        collection: 'players'
    }
);

// @Schema()
// export class Players{

// }