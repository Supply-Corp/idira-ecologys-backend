import { Router } from "express";
import { AuthController } from "./controller";
import { AuthService } from "./service";
import { UserValidationMiddleware } from "../../middlewares";

export class AuthRoutes {
    static get routes(): Router {
        const router = Router();

        const service = new AuthService();
        const controller = new AuthController(service);

        router.post("/login", controller.login);
        router.get("/user", [UserValidationMiddleware.auth] , controller.user)

        return router;
    }
}
