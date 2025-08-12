import express from "express";
import { verifyToken } from "../middleware/verify.js";
import Balance from "../models/balance.js";
import mongoose from "mongoose";

const accountRouter = express.Router();

accountRouter.get("/getBalance", verifyToken, async (req, res) => {
    try {
        const balance = await Balance.findOne({ userId: req.user.userId });
        res.status(200).json({ balance });
    } catch (error) {
        res.status(500).json({ message: "Error getting balance", error });
    }
});

accountRouter.post("/addBalance", verifyToken, async (req, res) => {
    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        const { amount } = req.body;
        const balance = await Balance.findOne({ userId: req.user.userId });
        if (!balance) {
            return res.status(404).json({ message: "Balance not found" });
        }
        balance.balance += amount;
        await balance.save();
        await session.commitTransaction();
        session.endSession();
        res.status(200).json({ message: "Balance added successfully", balance });
    } catch (error) {
        res.status(500).json({ message: "Error adding balance", error });
    }
});

accountRouter.post("/transfer", verifyToken, async (req, res) => {
    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        const { amount, userId } = req.body;
        const senderBalance = await Balance.findOne({ userId: req.user.userId });
        const receiverBalance = await Balance.findOne({ userId });

        if(senderBalance.userId === receiverBalance.userId) {
            return res.status(400).json({ message: "You cannot transfer balance to yourself" });
        }

        if(!senderBalance || !receiverBalance) {
            return res.status(404).json({ message: "Balance not found" });
        }
        if(senderBalance.balance < amount) {
            return res.status(400).json({ message: "Insufficient balance" });
        }
     
        senderBalance.balance -= parseInt(amount);
        receiverBalance.balance += parseInt(amount);
        await senderBalance.save();
        await receiverBalance.save();
        await session.commitTransaction();
        session.endSession();
        res.status(200).json({ message: "Balance transferred successfully", balance: senderBalance.balance, userBalance: receiverBalance.balance });
    } catch (error) {
        res.status(500).json({ message: "Error transferring balance", error });
    }
});


export default accountRouter;