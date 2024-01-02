import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { gemini } from "./classes/Gemini";
dotenv.config({});

const app = express();
app.use(cors());
app.use(express.static("public"));
app.use(express.json());

app.post("/api/json", async (req, res) => {
  const response = await gemini.generateContentReq(req.body.prompt);
  if (!response) {
    return res.json({ error: "No response", text: "" });
  }
  res.json({ text: response });
});

app.post("/api", (req, res) => {
  res.json({ text: "Hello World!" });
});

const port = !isNaN(parseInt(process.env.PORT as string)) ? parseInt(process.env.PORT as string) : 3000;
app.listen(port, () => {
  console.log(`Express server listening to port ${port}`);
});

export default app;
