import { Router } from "express";
import { SedesService } from "./service";
import { SedesController } from "./controller";

export class SedesRoutes {
    static get routes(): Router {
        const router = Router();

        const service = new SedesService();
        const controller = new SedesController(service);

        router.get("/:company", controller.list);
        router.post("/", controller.store);
        router.put("/:id", controller.update);
        router.delete("/:id", controller.delete);
        router.get("/:id", controller.get);

        return router;
    }
}
