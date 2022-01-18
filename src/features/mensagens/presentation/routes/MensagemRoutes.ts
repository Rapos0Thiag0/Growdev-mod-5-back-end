import { Router } from "express";
import { CreateMessageController } from "../controllers/create-mensagem.controller";
import { GetByUidMessageController } from "../controllers/get-one-mensagem.controller";

export default class MensagemRoutes {
  public init(): Router {
    const routes = Router();

    routes.post("/mensagens/:user_uid", new CreateMessageController().handle);
    // routes.get("/mensagens/:user_uid", controller.index);
    routes.get(
      "/mensagens/:user_uid/:uid",
      new GetByUidMessageController().handle
    );
    // routes.put("mensagens/:user_uid/:uid", controller.update);
    // routes.delete("/mensagens/:user_uid/:uid", controller.destroy);

    return routes;
  }
}
