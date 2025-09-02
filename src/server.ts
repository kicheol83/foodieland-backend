import dotenv from "dotenv";
dotenv.config({
  path: process.env.NODE_ENV === "production" ? ".env.production" : ".env",
});

import mongoose from "mongoose";
import app from "./app";
import "./config/passport";
import { Server as SocketIOServer } from "socket.io";
import http from "http";

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_URL as string, {})
  .then((data) => {
    console.log("MongoDB connection succed");
    const PORT = process.env.PORT ?? 3005;
    server.listen(PORT, () => {
      console.info(`The server is running succesfully on port: ${PORT}`);
      console.info(`Admin project on http://localhost:${PORT}/admin \n`);
    });
  })
  .catch((err) => console.log("ERROR on connection MongoDB", err));

const server = http.createServer(app);
const io = new SocketIOServer(server, {
  cors: {
    origin: ["http://72.60.107.80:3015"],
    credentials: true,
  },
});

let summaryClient = 0;
io.on("connection", (socket) => {
  summaryClient++;
  console.log(`Connected & total [${summaryClient}]`);

  socket.on("disconnect", () => {
    summaryClient--;
    console.log(`Disconnected & total [${summaryClient}]`);
  });
});
