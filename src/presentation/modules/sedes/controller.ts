import { Request, Response } from "express";
import { SedesService } from "./service";
import { HandleError } from "../../../domain";

export class SedesController {

    constructor(
        private service: SedesService
    ) {}

    store = async (req: Request, res: Response) => {

        this.service
        .store()
        .then((response) => res.send(response))
        .catch((error) => HandleError.handle(error, res))
    }

    update = async (req: Request, res: Response) => {

        this.service
        .update()
        .then((response) => res.send(response))
        .catch((error) => HandleError.handle(error, res))
    }

    delete = async (req: Request, res: Response) => {

        this.service
        .delete()
        .then((response) => res.send(response))
        .catch((error) => HandleError.handle(error, res))
    }

    get = async (req: Request, res: Response) => {

        this.service
        .get()
        .then((response) => res.send(response))
        .catch((error) => HandleError.handle(error, res))
    }

    list = async (req: Request, res: Response) => {

        this.service
        .list()
        .then((response) => res.send(response))
        .catch((error) => HandleError.handle(error, res))
    }

}