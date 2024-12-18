import mongoose from "mongoose";

let isConnected = false; //Allows us to track the connection status

export const connectToDB = async () => {
    mongoose.set('strictQuery',true);

    if(isConnected)
    {
        console.log('MongoDB is already connected');
        return;
    }

    try
    {
        //Try to establish connection
        await mongoose.connect(ProcessingInstruction.env.MONGODB_URI,{
            dbName: "share prompt",
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        isConnected=true;
        console.log("MongoDB Connected")
    }
    catch(error)
    {
        console.log(error);
    }

}