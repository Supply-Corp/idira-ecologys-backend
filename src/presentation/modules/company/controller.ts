import { Request, Response } from "express";
import { CompanyService } from "./service";
import { CreateCompanyDto, HandleError } from "../../../domain";

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

}