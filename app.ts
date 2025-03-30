import * as dotenv from "dotenv";

let envFilePath = ".env.development";

if (process.env.NODE_ENV === "production") {
  envFilePath = ".env.production";
}
dotenv.config({ path: envFilePath });

const PORT = process.env.PORT;

import express from "express";
import router from "./src/routers";

import cors from "cors";
import morgan from "morgan";

const app = express();

app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  cors({
    origin: ["http://localhost:5173", "https://caffeine-app-iota.vercel.app"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "HEAD", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(router);

app.listen(PORT, () => {
  console.log(`Server Is Running On PORT ${PORT}`);
});

export default app;
