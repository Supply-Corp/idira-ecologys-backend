import { Router } from "express";
import { SubDirectoryService } from "./service";
import { SubDirectoryController } from "./controller";

export class SubDirectoryRoutes {
    static get routes(): Router {
        const router = Router();

        const service = new SubDirectoryService();
        const controller = new SubDirectoryController(service);

        router.get("/", controller.list);
        router.post("/", controller.store);
        router.put("/:id", controller.update);
        router.delete("/:id", controller.delete);
        router.get("/:id", controller.get);

        return router;
    }
}
