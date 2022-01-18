import { Request, Response } from "express";
import { MensagemEntity } from "../../../../core/infra/data/database/entities/mensagem";
import { UserEntity } from "../../../../core/infra/data/database/entities/user";

export default class MensagemController {
  public async store(req: Request, res: Response) {
    const { user_uid } = req.params;
    const { descricao, detalhamento } = req.body;
    const user = await UserEntity.findOne(user_uid);

    if (user) {
      const mensagem = await new MensagemEntity().save();
      console.log(mensagem);
      return res.status(200).send("Mensagem criada!");
    } else {
      return res.status(400).send("Usuário não encontrdo!");
    }
  }

  public async index(req: Request, res: Response) {
    const { user_uid } = req.params;
    const userMensagens = await MensagemEntity.find({
      where: [{ user_uid: user_uid }],
      select: ["descricao", "detalhamento", "uid"],
    });

    return res.status(200).json(userMensagens);
  }

  public async view(req: Request, res: Response) {
    const { uid } = req.params;

    const mensagens = await MensagemEntity.findOne(uid, {
      select: ["descricao", "detalhamento", "uid"],
    });
    if (mensagens) {
      const descricao = mensagens.descricao;
      const detalhamento = mensagens.detalhamento;
      const uid = mensagens.uid;
      const msg = {
        descricao: descricao,
        detalhamento: detalhamento,
        uid: uid,
      };
      console.log(msg);
      return res.status(200).json(msg);
    }
  }

  public async update(req: Request, res: Response) {
    const { uid, user_uid } = req.params;

    const { descricao, detalhamento } = req.body;

    const user = await UserEntity.findOne(user_uid);
    const mensagem = await MensagemEntity.findOne(uid);

    if (user && mensagem) {
      if (descricao && detalhamento) {
        const mensagemEditada = await MensagemEntity.findOne(uid);
        if (mensagemEditada) {
          const mensagem = await new MensagemEntity().save();
          console.log(mensagem);
          return res.status(200).send("Mensagem ataualizada com sucesso!");
        }
      }
    } else {
      return res.status(400).send("Parâmmetros faltando!");
    }
  }

  public async destroy(req: Request, res: Response) {
    const { uid, user_uid } = req.params;

    const user = await UserEntity.findOne(user_uid);
    const mensagem = await MensagemEntity.findOne(uid);

    if (user && mensagem) {
      const mensagemRemoved = await MensagemEntity.findOne(uid);
      if (mensagemRemoved) {
        const result = await MensagemEntity.remove(mensagemRemoved);
        console.log(result);
        return res.status(200).send("Mensagem deletada com sucesso!");
      } else {
        return res.status(400).send("Mensagem não encontrada!");
      }
    } else {
      return res.status(400).send("Parâmetros faltando!!");
    }
  }
}
