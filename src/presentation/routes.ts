import { Router } from "express";
import { AuthRoutes } from "./modules/auth";
import { CompanyRoutes } from "./modules/company";
import { TrimMiddleware } from "./middlewares";

export class ServerRoutes {
    static get routes(): Router {

        const router = Router();

        router.use(TrimMiddleware.trim);
        router.use('/api/v1/auth', AuthRoutes.routes);
        router.use('/api/v1/company', CompanyRoutes.routes);

        return router;
    }
}
