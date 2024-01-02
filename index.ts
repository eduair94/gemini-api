import { Request, Response } from "express";
import server from "./classes/Express/ExpressSetup";
import { gemini } from "./classes/Gemini";
async function main() {
  server.postJson("api/json", async (req: Request, res: Response) => {
    const response = await gemini.generateContentReq(req.body.prompt);
    if (!response) {
      return { error: "No response", text: "" };
    }
    return { text: response };
  });
}

main();
