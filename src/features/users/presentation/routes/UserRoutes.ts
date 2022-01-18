import { Router } from "express";
import { SignUpUserController } from "../controllers/signUp.controller";
import { SignInUserController } from "../controllers/signIn.controller";
import { GetAllUsersController } from "../controllers/get-all-users.controller";

export default class UserRoutes {
  public init(): Router {
    const routes = Router();

    routes.post(
      "/signup",
      new SignUpUserController().handle
    ); /* chamada no front no arquivo novaConta */
    routes.post(
      "/signin",
      new SignInUserController().handle
    ); /* chamada no front no arquivo login */
    routes.get(
      "/users",
      new GetAllUsersController().handle
    ); /* chamada no front no arquivo ... */

    return routes;
  }
}
