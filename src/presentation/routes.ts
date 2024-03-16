import { Router } from "express";
import { AuthRoutes } from "./modules/auth";
import { CompanyRoutes } from "./modules/company";
import { TrimMiddleware } from "./middlewares";
import { SedesRoutes } from "./modules/sedes";
import { UserRoutes } from "./modules/users";
import { DirectoryRoutes } from "./modules/directory";
import { SubDirectoryRoutes } from "./modules/subDirectory";
import { SubDirectoryYearRoutes } from "./modules/subDirectoryYears";

export class ServerRoutes {
    static get routes(): Router {

        const router = Router();

        router.use(TrimMiddleware.trim);
        router.use('/api/v1/auth', AuthRoutes.routes);
        router.use('/api/v1/company', CompanyRoutes.routes);
        router.use('/api/v1/sede', SedesRoutes.routes);
        router.use('/api/v1/users', UserRoutes.routes);
        router.use('/api/v1/directory', DirectoryRoutes.routes);
        router.use('/api/v1/subdirectory', SubDirectoryRoutes.routes);
        router.use('/api/v1/subdirectory-years', SubDirectoryYearRoutes.routes);

        return router;
    }
}
