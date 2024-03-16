import { Request, Response } from "express";
import { CreateDirectoryDto, DeleteDto, GetDto, HandleError, PaginationDto, UpdateDirectoryDto } from "../../../domain";
import { DirectoryService } from "./service";

export class DirectoryController {
  constructor(private service: DirectoryService) {}

  store = async (req: Request, res: Response) => {
    const [error, dto] = await CreateDirectoryDto.create(req);
    if (error) return res.status(400).json({ error });

    this.service
    .store( dto! )
    .then((response) => res.send(response))
    .catch((error) => HandleError.handle(error, res));
  };

  update = async (req: Request, res: Response) => {
    const [error, dto] = await UpdateDirectoryDto.create(req);
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

    this.service
    .list( dto! )
    .then((response) => res.send(response))
    .catch((error) => HandleError.handle(error, res));
  };
}
