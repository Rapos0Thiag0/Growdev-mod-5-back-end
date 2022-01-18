import { UserEntity } from "../../../../core/infra/data/database/entities/user";
import { User } from "../../domain/models/user";

interface UserParams {
  uid?: string;
  nome: string;
  senha: string;
}

export class UserRepository {
  async signUp(data: UserParams): Promise<User> {
    const userEntity = UserEntity.create({
      nome: data.nome,
      senha: data.senha,
    });

    const verificaNome = await UserEntity.findOne({
      where: { nome: data.nome },
    });
    if (verificaNome) throw new Error("ALREADY_EXIST_USER_ERROR");

    await userEntity.save();

    return this.mapperFromEntityToModel(userEntity);
  }

  async signIn(data: UserParams): Promise<User | undefined> {
    const userEntity = await UserEntity.findOne({
      where: { nome: data.nome },
    });

    if (!userEntity) return undefined;

    return this.mapperFromEntityToModel(userEntity);
  }

  async getAll(): Promise<User[]> {
    const userEntities = await UserEntity.find({
      relations: ["mensagens"],
    });

    return userEntities.map((userEntity) =>
      this.mapperFromEntityToModel(userEntity)
    );
  }

  // async getByUid(uid: string): Promise<User | undefined> {
  //   const userEntity = await UserEntity.findOne(uid);

  //   if (!userEntity) return undefined;

  //   return this.mapperFromEntityToModel(userEntity);
  // }

  // async editUser(data: UserParams): Promise<User | undefined> {
  //   const userEntity = await UserEntity.findOne(data.uid);

  //   if (!userEntity) return undefined;

  //   const userUpdated = UserEntity.create({
  //     nome: data.nome,
  //     senha: data.senha,
  //     uid: data.uid,
  //   });

  //   await userUpdated.save();

  //   return this.mapperFromEntityToModel(userUpdated);
  // }

  // async destroy(uid: string): Promise<User | undefined> {
  //   const userEntity = await UserEntity.findOne(uid);

  //   if (!userEntity) return undefined;

  //   await UserEntity.remove(userEntity);

  //   return this.mapperFromEntityToModel(userEntity);
  // }

  private mapperFromEntityToModel(entity: UserEntity): User {
    return {
      uid: entity.uid,
      name: entity.nome,
      password: entity.senha,
      messages: entity.mensagens,
    };
  }
}
