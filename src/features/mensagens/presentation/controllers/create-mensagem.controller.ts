import { Request, Response } from "express";
import { Controller } from "../../../../core/presentation/contracts/controllers";
import {
  serverError,
  sucess,
} from "../../../../core/presentation/helpers/http-helper";
import { MensagemRepository } from "../../infra/mensagem-repository";

export class CreateMessageController implements Controller {
  async handle(req: Request, res: Response): Promise<any> {
    try {
      const repository = new MensagemRepository();
      const { user_uid } = req.params;

      const mensagem = await repository.create(req.body, user_uid);

      return sucess(res, mensagem);
    } catch (err) {
      return serverError(res, err);
    }
  }
}
