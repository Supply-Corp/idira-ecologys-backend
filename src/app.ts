import { envs } from "./configuration";
import { ServerRoutes } from "./presentation/routes";
import { Server } from "./presentation/server";

(()=> {
    const { PORT } = envs;

    const server = new Server(PORT, ServerRoutes.routes);
    server.start();
})();