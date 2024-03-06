import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

mongoose
  .connect(process.env.Mongo)
  .then(() => console.log("Mongodb connected"));

const app = express();

app.listen(3000, () => {
  console.log("Server on port 3000");
});
