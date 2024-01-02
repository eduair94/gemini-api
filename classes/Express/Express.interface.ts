import { Request, Response } from "express";

export interface rFunctionExpress {
  error: string;
  success: any;
}

export interface FunctionExpress {
  (req: Request, res?: Response): Promise<any>;
}

export interface FunctionExpressRes {
  (req: Request, res: Response): Promise<rFunctionExpress>;
}
