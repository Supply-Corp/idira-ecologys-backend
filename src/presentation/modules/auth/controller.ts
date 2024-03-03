import { Request, Response } from "express";
import { AuthService } from "./service";
import { HandleError, LoginDto } from "../../../domain";

export class AuthController {
    constructor(private service: AuthService) {}

    login = async (req: Request, res: Response) => {
        const [error, dto] = await LoginDto.create(req);
        if (error) return res.status(400).json({ error });

        this.service
        .login(dto!)
        .then((response) => res.send(response))
        .catch((error) => HandleError.handle(error, res));
    };
}
