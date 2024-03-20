import mongoose, { Mongoose } from "mongoose";
export async function connect(){
    try{
      
        mongoose.connect(process.env.MONGO_URI!)
        const connection=mongoose.connection;
        connection.on('connected',()=>{
            console.log("database connected")
        })

        connection.on('error',(err)=>{
            console.log("Connection error" + err);
            process.exit();
        })
    }catch(err){
        console.log("something went wrong")
        console.log(err)
    }
}