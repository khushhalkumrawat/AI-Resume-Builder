import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDB = async () => {
    try{
          mongoose.connection.on("connected" , () => {console.log("Database connected successfully")})

          let mongodbURL = process.env.MONGODB_URL
          const projectName = 'resume-builder';

          if(!mongodbURL){
            throw new Error("MONGODB_URL environment variable not set")
          }

          if(mongodbURL.endsWith('/')){
            mongodbURL = mongodbURL.slice(0,-1);
          }

          await mongoose.connect(`${mongodbURL}/${projectName}`)

    } catch(error){
       console.error("Error connecting to MongoDB : " , error);
       throw error;
    }
}

export default connectDB