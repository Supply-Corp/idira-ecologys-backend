import { Router } from "express";
import { SubDirectoryYearService } from "./service";
import { SubDirectoryYearController } from "./controller";

export class DirectoryRoutes {
    static get routes(): Router {
        const router = Router();

        const service = new SubDirectoryYearService();
        const controller = new SubDirectoryYearController(service);

        router.get("/", controller.list);
        router.post("/", controller.store);
        router.put("/:id", controller.update);
        router.delete("/:id", controller.delete);
        router.get("/:id", controller.get);

        return router;
    }
}
