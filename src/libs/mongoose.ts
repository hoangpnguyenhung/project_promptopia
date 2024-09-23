import mongoose from "mongoose";

let isConnected: boolean = false;

export const connectToDB = async () => {
  mongoose.set("strictQuery", true); // không cho truy vấn các thuộc tính không có trong schema

  if (isConnected) return;

  try {
    await mongoose.connect(process.env.MONGODB_URI || "", {
      dbName: "share_prompt",
    });

    isConnected = true;
    console.log("Connected to MongoDB successfully");
  } catch (error) {
    console.log(error);
  }
};
