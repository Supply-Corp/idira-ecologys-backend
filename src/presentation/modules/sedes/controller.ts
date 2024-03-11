import { Request, Response } from "express";
import { SedesService } from "./service";
import { CreateSedeDto, DeleteSedeDto, GetSedeDto, HandleError, PaginationDto, UpdateSedeDto } from "../../../domain";

export class SedesController {

    constructor(
        private service: SedesService
    ) {}

    store = async (req: Request, res: Response) => {
        const [error, dto] = await CreateSedeDto.create(req);
        if (error) return res.status(400).json({ error });

        this.service
        .store( dto! )
        .then((response) => res.send(response))
        .catch((error) => HandleError.handle(error, res))
    }

    update = async (req: Request, res: Response) => {
        const [error, dto] = await UpdateSedeDto.create(req);
        if (error) return res.status(400).json({ error });

        this.service
        .update( dto! )
        .then((response) => res.send(response))
        .catch((error) => HandleError.handle(error, res))
    }

    delete = async (req: Request, res: Response) => {
        const [error, dto] = await DeleteSedeDto.create(req);
        if (error) return res.status(400).json({ error });

        this.service
        .delete( dto! )
        .then((response) => res.send(response))
        .catch((error) => HandleError.handle(error, res))
    }

    get = async (req: Request, res: Response) => {
        const [error, dto] = await GetSedeDto.create(req);
        if (error) return res.status(400).json({ error });

        this.service
        .get( dto! )
        .then((response) => res.send(response))
        .catch((error) => HandleError.handle(error, res))
    }

    list = async (req: Request, res: Response) => {
        const [error, dto] = PaginationDto.create(req);
        if (error) return res.status(400).json({ error });

        const company = req.params.company;
        if(!company) return res.status(400).json({ error: 'company es requerido' })


        this.service
        .list( dto!, +company )
        .then((response) => res.send(response))
        .catch((error) => HandleError.handle(error, res))
    }

}