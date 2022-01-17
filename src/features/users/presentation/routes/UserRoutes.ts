import { Router } from "express";
import { CreatUserController } from "../controllers/creat-user.controller";
import { GetAllUsersController } from "../controllers/get-all-users.controller";
import { GetByUidUserController } from "../controllers/get-one-user.controller";

export default class UserRoutes {
  public init(): Router {
    const routes = Router();

    routes.post("/user", new CreatUserController().handle);
    routes.get("/user", new GetAllUsersController().handle);
    routes.get("/user/:uid", new GetByUidUserController().handle);
    // routes.put("/user/:uid", controller.update);
    // routes.delete("/user/:uid", controller.destroy);

    return routes;
  }
}
