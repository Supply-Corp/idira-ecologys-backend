import { Request, Response } from "express";
import { AuthService } from "./service";
import { LoginDto } from "../../../domain";

export class AuthController {

    constructor( 
        service: AuthService,
    ) {}

    login = async (req: Request, res: Response) => {
        const [error, dto] = await LoginDto.create(req);
        if (error) return res.status(400).json({ error });

        res.send(dto)
    }

}