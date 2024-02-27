import { Request, Response } from "express";
import { CompanyService } from "./service";
import { CreateCompanyDto, DeleteCompanyDto, GetCompanyDto, HandleError, PaginationDto, UpdateCompanyDto } from "../../../domain";

export class CompanyController {

    constructor(
        private service: CompanyService
    ) {}

    store = async (req: Request, res: Response) => {
        const [error, dto] = await CreateCompanyDto.create(req);
        if (error) return res.status(400).json({ error });

        this.service.create( dto! )
        .then((response) => res.send(response))
        .catch((error) => HandleError.handle(error, res));
    }

    update = async (req: Request, res: Response) => {
        const [error, dto] = await UpdateCompanyDto.create(req);
        if (error) return res.status(400).json({ error });

        this.service.update( dto! )
        .then((response) => res.send(response))
        .catch((error) => HandleError.handle(error, res));
    }

    delete = async (req: Request, res: Response) => {
        const [error, dto] = await DeleteCompanyDto.create(req);
        if (error) return res.status(400).json({ error });

        this.service.delete( dto! )
        .then((response) => res.send(response))
        .catch((error) => HandleError.handle(error, res));
    }

    get = async (req: Request, res: Response) => {
        const [error, dto] = await GetCompanyDto.create(req);
        if (error) return res.status(400).json({ error });

        this.service.get( dto! )
        .then((response) => res.send(response))
        .catch((error) => HandleError.handle(error, res));
    }

    list = async (req: Request, res: Response) => {
        const [error, dto] = PaginationDto.create(req);
        if (error) return res.status(400).json({ error });

        this.service.list( dto! )
        .then((response) => res.send(response))
        .catch((error) => HandleError.handle(error, res));
    }
}