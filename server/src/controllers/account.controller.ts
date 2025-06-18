import { Account } from "../models/account.model";


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

export const send: any = async (req: any, res: any) => {
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

    await Account.updateOne({userId: trans.userId},{
     $inc: {balance: amount}
    })


};
