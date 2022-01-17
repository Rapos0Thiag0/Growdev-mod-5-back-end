import { Request, Response } from "express";
import { Controller } from "../../../../core/presentation/contracts/controllers";
import {
  notFound,
  serverError,
  sucess,
} from "../../../../core/presentation/helpers/http-helper";
import { UserRepository } from "../../infra/repositories/user-repository";

export class EditUserController implements Controller {
  async handle(req: Request, res: Response): Promise<any> {
    try {
      const { uid } = req.params;

      const repository = new UserRepository();

      const user = await repository.editUser({ uid, ...req.body });

      if (!user) return notFound(res);

      return sucess(res, user);
    } catch (err) {
      return serverError(res);
    }
  }
}
