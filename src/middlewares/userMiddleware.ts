import { Request, Response, NextFunction } from "express";

export function validator(req: Request, res: Response, next: NextFunction): void {
  console.log("Middleware executed");
  next();
}