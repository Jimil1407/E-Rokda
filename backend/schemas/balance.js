import mongoose from "mongoose";

const balanceSchema = new mongoose.Schema({
    balance: {
        type: Number,
        default: 0,
    },userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
});

export default balanceSchema;