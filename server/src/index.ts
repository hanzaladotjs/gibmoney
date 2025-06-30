import express from "express";
import { connectDB } from "./utils/db";
import mainRouter from "./routes/index";
import cors from "cors"

const app = express();
app.use(cors({
  origin:"https://gibmoney.hanzala.xyz",
  credentials: true             
}));

app.use(express.json());




app.use("/api/v1", mainRouter);

const startServer = async () => {
  await connectDB();

  app.listen(process.env.PORT || 3000, () => {
    console.log(`listening on ${process.env.PORT}`);
  });
};

startServer();
