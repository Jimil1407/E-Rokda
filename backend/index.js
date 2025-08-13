import express from "express";
import { connectDB } from "./schemas/db.js";
import dotenv from "dotenv";
import rootRouter from "./routes/index.js";
import userRouter from "./routes/user.js";
import accountRouter from "./routes/account.js";
import cors from "cors";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/v1/users", userRouter);
app.use("/api/v1", rootRouter);
app.use("/api/v1/account", accountRouter);

connectDB();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


