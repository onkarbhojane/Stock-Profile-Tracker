import mongoose from "mongoose";
const conn= async()=>{
    try{
        const res=await mongoose.connect(`${process.env.MONGO_URL}`);
        if(res){
            console.log("connected to DB")
        }else{
            console.log("connection failed ");
        }
    }catch(error){
        console.log("connection error....",error)
    }
}

export default conn;
