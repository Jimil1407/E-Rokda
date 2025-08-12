import express from "express";
import { connectDB } from "./schemas/db.js";
import userSchema from "./schemas/userschema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import zod from "zod";
import mongoose from "mongoose";
import { verifyToken } from "./middleware/verify.js";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;


const app = express();

connectDB();
const User = mongoose.model("User", userSchema);
app.use(express.json());

app.post("/api/users/signup", async (req, res) => {
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
        res.status(200).json({ message: "User created successfully", user } );
    } catch (error) {
        res.status(500).json({ message: "Error creating user", error });
    }
});

app.post("/api/users/signin", async (req, res) => {
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
        res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        res.status(500).json({ message: "Error logging in", error });
    }
});

app.put("/api/users/update", verifyToken, async (req, res) => {
    try {
        const { firstName, lastName, email } = req.body;
        const user = await User.findOne({ _id: req.user.userId });
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        if(email !== user.email) {
            return res.status(400).json({ message: "Email cannot be changed" });
        }

        if(firstName === "" || lastName === "" || firstName === null || lastName === null) {
            return res.status(400).json({ message: "First name and last name are required" });
        }

        user.firstName = firstName;
        user.lastName = lastName;
        await user.save();
        const updatedUser = await User.findOne({ _id: req.user.userId });
        res.status(200).json({ message: "User updated successfully", firstName: updatedUser.firstName, lastName: updatedUser.lastName });
    } catch (error) {
        res.status(500).json({ message: "Error updating user", error });
    }
});


app.listen(3000, () => {
    console.log("Server is running on port 3000");
});


