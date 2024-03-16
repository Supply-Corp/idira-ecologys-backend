import { Router } from "express";
import { DirectoryService } from "./service";
import { DirectoryController } from "./controller";

export class DirectoryRoutes {
    static get routes(): Router {
        const router = Router();

        const service = new DirectoryService();
        const controller = new DirectoryController(service);

        router.get("/", controller.list);
        router.post("/", controller.store);
        router.put("/:id", controller.update);
        router.delete("/:id", controller.delete);
        router.get("/:id", controller.get);

        return router;
    }
}
