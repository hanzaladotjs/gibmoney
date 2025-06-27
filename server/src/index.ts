import express from "express";
import { connectDB } from "./utils/db";
import mainRouter from "./routes/index";
import cors from "cors"

const app = express();
app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173", // ✅ Your frontend dev origin
  credentials: true                // ✅ If you're using cookies/auth later
}));


app.use("/api/v1", mainRouter);

const startServer = async () => {
  await connectDB();

  app.listen(process.env.PORT || 3000, () => {
    console.log(`listening on ${process.env.PORT}`);
  });
};

startServer();
