import { Router } from "express";

export class ServerRoutes {
    static get routes(): Router {

        const router = Router();
        router.use('/api/v1/');

        return router;
    }
}
