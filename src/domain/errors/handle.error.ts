import { Response } from "express";
import { CustomError } from "../errors/custom.error";

export class HandleError {
    static handle = (error: unknown, res: Response) => {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ error: error.message });
        }

        return res.status(500).json({ error: "internal server error" });
    };
}
