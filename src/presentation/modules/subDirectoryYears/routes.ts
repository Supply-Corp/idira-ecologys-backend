import { Router } from "express";
import { SubDirectoryYearService } from "./service";
import { SubDirectoryYearController } from "./controller";

export class SubDirectoryYearRoutes {
    static get routes(): Router {
        const router = Router();

        const service = new SubDirectoryYearService();
        const controller = new SubDirectoryYearController(service);

        router.get("/subdirectory/:subdirectory", controller.list);
        router.post("/", controller.store);
        router.put("/:id", controller.update);
        router.delete("/:id", controller.delete);
        router.get("/:id", controller.get);

        return router;
    }
}
