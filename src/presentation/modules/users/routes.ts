import { Router } from "express";
import { UserController } from "./controller";
import { UserServices } from "./service";

export class UserRoutes {
    static get routes(): Router {
        const router = Router();

        const service = new UserServices();
        const controller = new UserController(service);

        router.get("/", controller.list);
        router.post("/", controller.store);
        router.put("/:id", controller.update);
        router.delete("/:id", controller.delete);
        router.get("/:id", controller.get);

        return router;
    }
}
