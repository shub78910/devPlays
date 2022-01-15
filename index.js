import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import userRoute from "./routes/userAuth.js";
import postRoute from "./routes/postRoute.js";
import addVideosToDB from "./models/videoModel.js";

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);

// 👇️ "/home/john/Desktop/javascript"
const __dirname = path.dirname(__filename);

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cookieParser());
app.use(cors());
dotenv.config();

app.use("/", postRoute);
app.use("/auth", userRoute);

const CONNECTION_URL = process.env.MONGO_URI;
const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Server Running on Port: http://localhost:${PORT}`)
);

//adding videos to db.
// addVideosToDB();

app.use(express.static("client/build"));
app.get("*", function (req, res) {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("mongodb connected"))
  .catch((error) => console.log(`${error} did not connect`));

mongoose.set("useFindAndModify", false);

//
