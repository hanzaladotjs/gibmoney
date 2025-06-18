import { Account } from "../models/account.model";
import mongoose from "mongoose";

interface transaction {
    amount: Number,
    address: string
}

export const balance: any = async (req: any, res: any) => {
  const account = await Account.findOne({
    userId: req.userId,
  });

  res.json({
    balance: account?.balance,
  });
};

export const Send: any = async (req: any, res: any) => {


   console.log("hi from send ")

    const {amount, address}: transaction = req.body

    const account:any = await Account.findOne({
        userId: req.userId
    })

    if(account.balance < amount ){
        return res.status(301).json({
            message: "not enough balance"
        })
    }

    const trans:any= await Account.findOne({
        userId: address
    })
    
    const transaction = await mongoose.startSession()

    transaction.startTransaction()

    await Account.updateOne({userId: trans.userId},{
     $inc: {balance: amount}
    })

    await Account.updateOne({
        userId: req.userId
    }, {
        $inc :{balance: -amount}
    })

    await transaction.commitTransaction()
    transaction.endSession()

    res.status(200).json({
        message:"success"
    })

};
