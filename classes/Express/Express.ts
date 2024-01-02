import cors from "cors";
import express, { Request, Response } from "express";
import { ValidationChain, validationResult } from "express-validator";
import * as http from "http";
import { bError } from "../General/Utils";
import { FunctionExpress } from "./Express.interface";
import middleware from "./Middleware";

class Express {
  private port: number;
  private app: express.Application = express();
  private baseUrl: string;

  constructor(
    port: number,
    baseUrl: string,
    recaptchaKey: { siteKey: string; secretKey: string } = {
      siteKey: "",
      secretKey: "",
    }
  ) {
    this.baseUrl = baseUrl;
    this.port = port;
    if (recaptchaKey.siteKey) {
    }
    //const origin = 'https://shellix.xyz';
    const origin = process.env.origin;
    this.app.use(cors());

    this.app.use(express.json({ limit: "50mb" }));
    this.app.set("trust proxy", true);
    this.app.use(express.urlencoded({ extended: false }));
    this.start();
    this.app.use(middleware.verifyRequest);
  }

  public getApp(): express.Application {
    return this.app;
  }

  public getJson(requestUrl: string, f: FunctionExpress): void {
    this.app.get(`${this.baseUrl}${requestUrl}`, async (req: Request, res: Response) => {
      const result: any = await f(req, res).catch((e) => {
        return bError(e.message);
      });
      res.json(result);
    });
  }

  public get(requestUrl: string, f: any): void {
    this.app.get(`${this.baseUrl}${requestUrl}`, async (req: Request, res: Response) => {
      f(req, res).catch((e) => {
        res.status(404);
        res.end();
      });
    });
  }

  public confirmPull(requestUrl: string, f: FunctionExpress): void {
    this.app.post(`${this.baseUrl}${requestUrl}`, async (req: Request, res: Response) => {
      res.json({ received: true });
      const result: any = await f(req);
    });
  }

  public postJson(requestUrl: string, f: FunctionExpress, validation: ValidationChain[] = []): void {
    this.app.post(`${this.baseUrl}${requestUrl}`, validation, async (req: Request, res: Response) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return { error: errors.array() };
      const result: any = await f(req).catch((e) => {
        console.error(e);
        return bError(e.message);
      });
      res.json(result);
    });
  }

  async start() {
    const server = http.createServer(this.app);
    server.listen(this.port, () => {
      console.log("Express server listening on port " + this.port);
    });
    server.on("error", function (e) {
      console.log(`Not connected to express ${e.message}`);
    });
  }
}

export default Express;
