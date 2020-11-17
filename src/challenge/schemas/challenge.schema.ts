import * as mongoose from 'mongoose';

export const ChallengeSchema = new mongoose.Schema({
    dateHourChallenge: { type: Date },
    status: { type: String },
    dateHourSolicitation: { type: Date },
    dateHourAnswer: { type: Date },
    requester: { type: mongoose.Schema.Types.ObjectId, ref: "Players" },
    category: { type: String },
    players: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Players"
    }],
    match: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Match"
    },
}, { timestamps: true, collection: 'challenges' })

