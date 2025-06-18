import mongoose, { Model } from "mongoose";
import { User } from "./user.model";

export interface AccountSchema {
  userId: mongoose.Schema.Types.ObjectId;
  balance: number;
}

const Accounts = new mongoose.Schema<AccountSchema>({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
  },
  balance: {
    type: Number,
    required: true,
  },
});

export const Account: Model<AccountSchema> = mongoose.model(
  "Account",
  Accounts
);
