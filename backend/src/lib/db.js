import mongoose from "mongoose";

export const connectDB = async ()=>{
    try{
      const conn=  await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB conneceted : ${conn.connection.host}`)
    } 
    catch(error){

console.log("error inn connecting to mmongoDB",error)
process.exit(1)
    }
} 