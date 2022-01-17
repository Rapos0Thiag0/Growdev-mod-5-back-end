import { Request, Response } from "express";
import { UserEntity } from "../../../../core/infra/data/database/entities/user";

export default class UserController {
  public async store(req: Request, res: Response) {
    const { nome, senha } = req.body;
    const verifyUserByName: UserEntity | undefined = await UserEntity.findOne({
      where: [{ nome: nome }],
    });
    if (verifyUserByName) {
      return res.status(400).json({ message: "user_exist" });
    } else if (nome === undefined || nome === "") {
      return res.status(400).json({ message: "empty_fields" });
    } else {
      const userNovo: UserEntity = await new UserEntity().save();
      return res.status(200).json(userNovo);
    }
  }

  public async index(req: Request, res: Response) {
    const users = await UserEntity.find({
      relations: ["mensagens"],
      select: ["nome", "senha", "uid"],
    });
    return res.json(users);
  }

  public async viewOne(req: Request, res: Response) {
    const { uid } = req.params;

    const userByUid = await UserEntity.findOne(uid, {
      relations: ["mensagens"],
      select: ["nome", "senha", "uid"],
    });
    return res.status(200).send(userByUid);
  }

  public async view(req: Request, res: Response) {
    const nome = req.query.nome;
    const senha = req.query.senha;

    const userByName: UserEntity | undefined = await UserEntity.findOne({
      where: [{ nome: nome }],
      relations: ["mensagens"],
      select: ["nome", "senha", "uid"],
    });

    if (
      nome === undefined ||
      nome === null ||
      nome === "" ||
      senha === undefined ||
      senha === null ||
      senha === ""
    ) {
      return res.status(400).json({ message: "field_error" });
    }
    if (!userByName) {
      return res.status(400).json({ message: "user_not_exist" });
    }
    if (userByName.senha === senha) {
      return res.status(200).json(userByName);
    } else {
      return res.status(400).json({ message: "senha_error" });
    }
  }

  public async update(req: Request, res: Response) {
    const { uid } = req.params;

    const { nome, senha } = req.body;

    const userByUid = await UserEntity.findOne(uid);

    if (nome && senha && userByUid) {
      const user = await new UserEntity().save();
      console.log(user);
      return res
        .status(200)
        .json({ message: "Usuário atualizado com sucesso!" });
    } else {
      return res.status(400).json({ message: "Parâmetros faltando!" });
    }
  }

  public async destroy(req: Request, res: Response) {
    const { uid } = req.params;

    const userByUid = await UserEntity.findOne(uid);

    if (userByUid) {
      const result = await UserEntity.remove(userByUid);
      console.log(result);
      return res.status(200).json({ message: "Usuário deletado com sucesso!" });
    } else {
      return res.status(400).json({ message: "Usuário não encontrado!" });
    }
  }
}
