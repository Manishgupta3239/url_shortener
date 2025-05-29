import mongoose from "mongoose";

const ConnectDb = async ()=>{
  try {
    const connect = await mongoose.connect(`${process.env.URI}`);

    if (connect) {
      console.log("Connected To Database");
      console.log("Database Name:", connect.connection.name);
      console.log("Connection State:", connect.connection.readyState);
    }
  } catch (error:unknown) {
    console.log("Error in Connecting To Database", error);
  }
};

export default ConnectDb;
