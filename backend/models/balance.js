import mongoose from "mongoose";
import balanceSchema from "../schemas/balance.js";

const Balance = mongoose.model("Balance", balanceSchema);

export default Balance;