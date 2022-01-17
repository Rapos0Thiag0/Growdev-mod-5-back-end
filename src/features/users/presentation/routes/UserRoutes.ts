import { Router } from "express";
import { CreatUserController } from "../controllers/creat-user.controller";
import { DestroyUserController } from "../controllers/delete-one-user.controller";
import { EditUserController } from "../controllers/edit-one-user.controller";
import { GetAllUsersController } from "../controllers/get-all-users.controller";
import { GetByUidUserController } from "../controllers/get-one-user.controller";

export default class UserRoutes {
  public init(): Router {
    const routes = Router();

    routes.post("/user", new CreatUserController().handle);
    routes.get("/user", new GetAllUsersController().handle);
    routes.get("/user/:uid", new GetByUidUserController().handle);
    routes.put("/user/:uid", new EditUserController().handle);
    routes.delete("/user/:uid", new DestroyUserController().handle);

    return routes;
  }
}
