import mongoose from 'mongoose';
const UserSchema=mongoose.Schema({
    Name:{
        type:String
    },
    EmailID:{
        type:String
    },
    Password:{
        type:String
    },
    ProfileImage:{
        type:String
    },
    PhoneNo:{
        type:String
    },
    Stocks:[{
        type:String
    }],
    TotalAmount:{
        type:Number
    },
    WalletAmount:{
        type:Number 
    },
})

const user=mongoose.model('user',UserSchema);
export default user;
