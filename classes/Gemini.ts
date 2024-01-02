import axios, { AxiosError, AxiosRequestConfig } from "axios";
import dotenv from "dotenv";
import { GeminiResponse } from "./gemini.interface";
dotenv.config();

class Gemini {
  apiKey = process.env.API_KEY;

  async generateContentReq(prompt: string) {
    const url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" + this.apiKey;
    const opt: AxiosRequestConfig = {
      headers: { "Content-Type": "application/json" },
    };
    const res = (await axios
      .post(
        url,
        {
          contents: { parts: [{ text: prompt }] },
        },
        opt
      )
      .then((res) => res.data)
      .catch((e: AxiosError) => {
        console.log(e.message);
        if (e.response.data) {
          console.log("Data response", e.response.data);
        }
        return "";
      })) as GeminiResponse;

    if (res) {
      return res.candidates[0].content.parts.map((el) => el.text).join(" ");
    }

    return "";
  }
}

const gemini = new Gemini();
export { gemini };
