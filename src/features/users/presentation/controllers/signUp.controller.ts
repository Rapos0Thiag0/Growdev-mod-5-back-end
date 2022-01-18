import { Request, Response } from "express";
import { Controller } from "../../../../core/presentation/contracts/controllers";
import {
  serverError,
  sucess,
} from "../../../../core/presentation/helpers/http-helper";
import { UserRepository } from "../../infra/repositories/user-repository";

export class SignUpUserController implements Controller {
  async handle(req: Request, res: Response): Promise<any> {
    try {
      const repository = new UserRepository();

      const user = await repository.signUp(req.body);

      return sucess(res, user);
    } catch (err) {
      console.log(res);
      return serverError(res);
    }
  }
}
