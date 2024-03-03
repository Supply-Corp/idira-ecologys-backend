import { NextFunction, Request, Response } from "express";

export class TrimMiddleware {
    static trim = (req: Request, res: Response, next: NextFunction) => {
        for (const key in req.body) {
            if (typeof req.body[key] === "string") {
                req.body[key] = req.body[key].trim();
            }
        }
        next();
    };
}
