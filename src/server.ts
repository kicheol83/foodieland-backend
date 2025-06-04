import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_URL as string, {})
  .then((data) => {
    console.log("MongoDB connection succed");
    const PORT = process.env.PORT ?? 3000;
  })
  .catch((err) => console.log("ERROR on connection MongoDB", err));
