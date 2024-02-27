import { Router } from "express";
import { AuthRoutes } from "./modules/auth";

export class ServerRoutes {
    static get routes(): Router {

        const router = Router();

        router.use('/api/v1/auth', AuthRoutes.routes);

        return router;
    }
}
