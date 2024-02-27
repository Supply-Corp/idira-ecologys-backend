import { Router } from "express";
import { AuthController } from "./controller";
import { AuthService } from "./service";

export class AuthRoutes {

    static get routes(): Router {
        const router = Router();

        const service = new AuthService();
        const controller = new AuthController( service );
        
        router.post('/login', controller.login);

        return router;
    }

}
