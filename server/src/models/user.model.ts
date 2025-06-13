import mongoose, { Model } from "mongoose"


export interface UserT {
    username: string,
    email: string,
    password: string,
}

const userSchema = new mongoose.Schema <UserT>({
    username: {
        type:String,
        required: true,
        unique: true,
        trim: true
    },
    email:  {
        type:String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true 
    },
   
})


export const User: Model<UserT>= mongoose.model<UserT>("User", userSchema)