import { Request, Response, NextFunction } from "express";

export const authenticateUser = (req: Request, res: Response, next: NextFunction) => {
   
    next();
};
