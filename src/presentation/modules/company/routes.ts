import { Router } from "express";
import { CompanyController } from "./controller";
import { CompanyService } from "./service";

export class CompanyRoutes {
    static get routes(): Router {
        const router = Router();

        const service = new CompanyService();
        const controller = new CompanyController(service);

        router.get("/", controller.list);
        router.post("/", controller.store);
        router.put("/:id", controller.update);
        router.delete("/:id", controller.delete);
        router.get("/:id", controller.get);

        return router;
    }
}
