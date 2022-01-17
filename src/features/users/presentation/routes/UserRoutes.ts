import { Router } from "express";
import { CreatUserController } from "../controllers/creat-user.controller";

export default class UserRoutes {
  public init(): Router {
    const routes = Router();

    routes.post("/user", new CreatUserController().handle);
    // routes.get("/users", controller.index);
    // routes.get("/user", controller.view);
    // routes.get("/user/:uid", controller.viewOne);
    // routes.put("/user/:uid", controller.update);
    // routes.delete("/user/:uid", controller.destroy);

    return routes;
  }
}
