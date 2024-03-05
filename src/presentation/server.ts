import express, { Router } from "express";
import { corsMiddleware } from "./middlewares";

export class Server {
    private readonly app = express();
    private readonly port: number;
    private readonly routes: Router;

    constructor(port: number, routes: Router) {
        this.port = port;
        this.routes = routes;
    }

    async start() {
        // middlewares
        this.app.use(express.json());
        this.app.use(corsMiddleware());

        //routes
        this.app.use(this.routes);

        //run serve
        this.app.listen(this.port, () => {
            console.log(`server in port ${this.port}`);
        });
    }
}
