import express from "express";
import User from "../models/user.js";
import { verifyToken } from "../middleware/verify.js";

const userRouter = express.Router();


userRouter.put("/update", verifyToken, async (req, res) => {
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

userRouter.get("/getAllUsers", verifyToken, async (req, res) => {
    try {
        const {firstName} = req.query;
        const users = await User.find({firstName: {$regex: firstName, $options: "i"}});
        res.status(200).json({ users });
    } catch (error) {
        res.status(500).json({ message: "Error getting users", error });
    }
});

export default userRouter;