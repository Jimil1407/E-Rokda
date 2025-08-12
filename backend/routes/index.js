import express from "express";
const rootRouter = express.Router();

rootRouter.get("/", (req, res) => {
    res.json({ message: "Paytm Project API is running!" });
});

export default rootRouter;