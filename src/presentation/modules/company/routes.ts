import { Router } from "express";
import { CompanyController } from "./controller";
import { CompanyService } from "./service";

export class CompanyRoutes {
    static get routes(): Router {
        const router = Router();

        const service = new CompanyService();
        const controller = new CompanyController( service );

        router.post('/', controller.store);

        return router;
    }
}
