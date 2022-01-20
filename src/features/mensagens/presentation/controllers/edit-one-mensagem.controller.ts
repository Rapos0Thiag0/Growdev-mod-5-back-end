import { Request, Response } from "express";
import { Controller } from "../../../../core/presentation/contracts/controllers";
import {
  badRequest,
  serverError,
  sucess,
} from "../../../../core/presentation/helpers/http-helper";
import { MensagemRepository } from "../../infra/mensagem-repository";

export class EditMessageController implements Controller {
  async handle(req: Request, res: Response): Promise<any> {
    const data = req.body;
    console.log(data);

    if (!data.descricao || !data.detalhamento) {
      return badRequest(res, "EMPTY_FIELDS_ERROR");
    }
    try {
      const { uid, user_uid } = req.params;
      const repository = new MensagemRepository();

      const mensagem = await repository.editMessage({
        uid,
        user_uid,
        ...req.body,
      });
      console.log(mensagem);
      return sucess(res, mensagem);
    } catch (err) {
      return serverError(res, err);
    }
  }
}
