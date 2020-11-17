import * as Mongoose from "mongoose";

export const CategoriesSchema = new Mongoose.Schema(
    {
        category: { type: String, unique: true },
        description: { type: String },
        events: [
            {
                name: { type: String },
                operation: { type: String },
                value: { type: Number },
            }
        ],
        players: [
            {
                type: Mongoose.Schema.Types.ObjectId,
                ref: 'Players'
            }
        ]
    },
    {
        timestamps: true,
        collection: 'categories'
    }
);