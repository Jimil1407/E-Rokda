import express from "express";
import zod from "zod";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import Balance from "../models/balance.js";

const rootRouter = express.Router();

const JWT_SECRET = process.env.JWT_SECRET;

rootRouter.post("/signup", async (req, res) => {
    try {
        const userSchema = zod.object({
            firstName: zod.string().min(3).max(50),
            lastName: zod.string().min(3).max(50),
            password: zod.string().min(8).max(50),
            email: zod.string().email(),
        });
        const { firstName, lastName, password, email } = userSchema.parse(req.body);
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ firstName, lastName, password: hashedPassword, email });
        const balance = await Balance.create({ userId: user._id, balance: 1000 });
        res.status(200).json({ message: "User created successfully", user: {
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
        }, balance } );
    } catch (error) {
        res.status(500).json({ message: "Error creating user", error });
    }
});

    rootRouter.post("/signin", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "1h" });
        res.status(200).json({ message: "Login successful", token, user: {
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
        } });
    } catch (error) {
        res.status(500).json({ message: "Error logging in", error });
    }
});


export default rootRouter;