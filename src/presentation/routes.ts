import { Router } from "express";
import { AuthRoutes } from "./modules/auth";
import { CompanyRoutes } from "./modules/company";
import { TrimMiddleware } from "./middlewares";
import { SedesRoutes } from "./modules/sedes";

export class ServerRoutes {
    static get routes(): Router {

        const router = Router();

        router.use(TrimMiddleware.trim);
        router.use('/api/v1/auth', AuthRoutes.routes);
        router.use('/api/v1/company', CompanyRoutes.routes);
        router.use('/api/v1/sede', SedesRoutes.routes);

        return router;
    }
}
