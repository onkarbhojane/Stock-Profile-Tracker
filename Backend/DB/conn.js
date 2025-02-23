import mongoose from "mongoose";
const connection_url = "mongodb://localhost:27017/Stock";
const conn=()=>{
    try{
        console.log("connecting to DB");
        mongoose.connect(connection_url);
    }catch(error){
        console.log("error in connecting to DB",error);
    }
}

export default conn;