import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { Controller } from "../../../../core/presentation/contracts/controllers";
import {
  serverError,
  sucess,
} from "../../../../core/presentation/helpers/http-helper";
import { MensagemRepository } from "../../infra/mensagem-repository";

export class GetAllMessagesController implements Controller {
  async handle(req: Request, res: Response): Promise<any> {
    try {
      const { user_uid } = req.params;

      const repository = new MensagemRepository();

      const mensagens = await repository.getAllMessages(user_uid);

      sucess(res, mensagens);
    } catch (err) {
      return serverError(res, err);
    }
  }
}
