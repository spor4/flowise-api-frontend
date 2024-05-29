import express from "express";
import bodyParser from "body-parser";
import * as dotenv from "dotenv";
dotenv.config();

// Controllers
import { createPrediction } from "./controllers/flowise.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("public"));

// Use body-parser middleware to parse incoming request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '10mb' })); // Increase the limit for JSON payloads

app.post("/api/flowise", createPrediction);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
