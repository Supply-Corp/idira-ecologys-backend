import { Request, Response } from "express";
import { UserServices } from "./service";
import { CreateUserDto, DeleteUserDto, GetUserDto, HandleError, PaginationDto, UpdateUserDto } from "../../../domain";

export class UserController {

    constructor(
        private service: UserServices
    ) {}

    list = async (req: Request, res: Response) => {
        const [error, dto] = PaginationDto.create(req);
        if (error) return res.status(400).json({ error });

        this.service
        .list( dto! )
        .then((response) => res.send(response))
        .catch((error) => HandleError.handle(error, res))
    }

    store = async (req: Request, res: Response) => {
        const [error, dto] = await CreateUserDto.create(req);
        if (error) return res.status(400).json({ error });

        this.service
        .store( dto! )
        .then((response) => res.send(response))
        .catch((error) => HandleError.handle(error, res))
    }

    update = async (req: Request, res: Response) => {
        const [error, dto] = await UpdateUserDto.create(req);
        if (error) return res.status(400).json({ error });

        this.service
        .update( dto! )
        .then((response) => res.send(response))
        .catch((error) => HandleError.handle(error, res))
    }

    get = async (req: Request, res: Response) => {
        const [error, dto] = await GetUserDto.create(req);
        if (error) return res.status(400).json({ error });

        this.service
        .get( dto! )
        .then((response) => res.send(response))
        .catch((error) => HandleError.handle(error, res))
    }

    delete = async (req: Request, res: Response) => {
        const [error, dto] = await DeleteUserDto.create(req);
        if (error) return res.status(400).json({ error });

        this.service
        .delete( dto! )
        .then((response) => res.send(response))
        .catch((error) => HandleError.handle(error, res))
    }

}