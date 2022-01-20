import { MensagemEntity } from "../../../core/infra/data/database/entities/mensagem";
import { UserEntity } from "../../../core/infra/data/database/entities/user";
import { User } from "../../users/domain/models/user";
import { Mensagem } from "../domain/models/mensagem";

interface MensagemParams {
  uid?: string;
  descricao: string;
  detalhamento: string;
  user_uid: string;
}

export class MensagemRepository {
  async create(
    data: MensagemParams,
    user_uid: string
  ): Promise<Mensagem | undefined> {
    const mensagemEntity = MensagemEntity.create({
      descricao: data.descricao,
      detalhamento: data.detalhamento,
      user_uid: user_uid,
    });
    const verificaUserByUid = await UserEntity.findOne({
      where: { uid: user_uid },
    });
    if (!verificaUserByUid) return undefined;

    await mensagemEntity.save();

    return this.mapperFromEntityToModel(mensagemEntity);
  }

  async getByUid(uid: string): Promise<Mensagem | undefined> {
    const mensagemEntity = await MensagemEntity.findOne(uid, {
      select: ["descricao", "detalhamento", "uid"],
    });

    if (!mensagemEntity) return undefined;

    return this.mapperFromEntityToModel(mensagemEntity);
  }

  async getLoggedUser(user_uid: string): Promise<User | undefined> {
    const loginUserVerification = await UserEntity.findOne({
      where: { uid: user_uid },
    });

    if (!loginUserVerification) throw new Error("USER_NOT_LOGGED");

    const loginOk: User = {
      uid: loginUserVerification.uid,
      name: loginUserVerification.nome,
      password: loginUserVerification.senha,
    };

    return loginOk;
  }

  private mapperFromEntityToModel(entity: MensagemEntity): Mensagem {
    return {
      uid: entity.uid,
      descricao: entity.descricao,
      detalhamento: entity.detalhamento,
      user_uid: entity.user_uid,
    };
  }
}
