import express from "express";
import { connectDB } from "./utils/db";

const app = express();

app.use(express.json());

const startServer = async () => {
 

  await connectDB();


  app.listen(3000, () => {
    console.log("listening");
  });
};
