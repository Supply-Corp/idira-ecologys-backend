import { Router } from "express";
import { AuthRoutes } from "./modules/auth";
import { CompanyRoutes } from "./modules/company";

export class ServerRoutes {
    static get routes(): Router {

        const router = Router();

        router.use('/api/v1/auth', AuthRoutes.routes);
        router.use('/api/v1/company', CompanyRoutes.routes);

        return router;
    }
}
