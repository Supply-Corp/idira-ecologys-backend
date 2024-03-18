import { Request, Response } from "express";
import { SubDirectoryYearService } from "./service";
import { CreateSubDirectoryYearDto, DeleteDto, GetDto, HandleError, PaginationDto, UpdateSubDirectoryYearDto } from "../../../domain";

export class SubDirectoryYearController {
  constructor(private service: SubDirectoryYearService) {}

  store = async (req: Request, res: Response) => {
    const [error, dto] = await CreateSubDirectoryYearDto.create(req);
    if (error) return res.status(400).json({ error });

    this.service
    .store( dto! )
    .then((response) => res.send(response))
    .catch((error) => HandleError.handle(error, res));
  };

  update = async (req: Request, res: Response) => {
    const [error, dto] = await UpdateSubDirectoryYearDto.create(req);
    if (error) return res.status(400).json({ error });

    this.service
    .update( dto! )
    .then((response) => res.send(response))
    .catch((error) => HandleError.handle(error, res));
  };

  delete = async (req: Request, res: Response) => {
    const [error, dto] = await DeleteDto.create(req);
    if (error) return res.status(400).json({ error });

    this.service
    .delete( dto! )
    .then((response) => res.send(response))
    .catch((error) => HandleError.handle(error, res));
  };

  get = async (req: Request, res: Response) => {
    const [error, dto] = await GetDto.create(req);
    if (error) return res.status(400).json({ error });

    this.service
    .get( dto! )
    .then((response) => res.send(response))
    .catch((error) => HandleError.handle(error, res));
  };

  list = async (req: Request, res: Response) => {
    const [error, dto] = PaginationDto.create(req);
    if (error) return res.status(400).json({ error });

    const id = req.params.subdirectory;

    this.service
    .list( dto!, +id )
    .then((response) => res.send(response))
    .catch((error) => HandleError.handle(error, res));
  };
}
