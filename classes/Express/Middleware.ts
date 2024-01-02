import { NextFunction, Request, Response } from "express";

class MiddleWare {
  async verifyRequest(req: Request, res: Response, next: NextFunction) {
    if (req.user) {
      console.log("USER", req.user);
    }
    next();
  }
}

const middleware = new MiddleWare();
export default middleware;
