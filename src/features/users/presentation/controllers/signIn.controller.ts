import { Request, Response } from "express";
import { Controller } from "../../../../core/presentation/contracts/controllers";
import {
  badRequest,
  notFound,
  serverError,
  sucess,
} from "../../../../core/presentation/helpers/http-helper";
import { UserRepository } from "../../infra/repositories/user-repository";

export class SignInUserController implements Controller {
  async handle(req: Request, res: Response): Promise<any> {
    try {
      const repository = new UserRepository();

      const users = await repository.signIn(req.body);

      if (!users) return notFound(res, "USER_NOT_FOUND_ERROR");
      if (users.password !== req.body.senha)
        return badRequest(res, "PASS_ERROR");

      return sucess(res, users.uid);
    } catch (err: any) {
      return serverError(res, err);
    }
  }
}
