import { UserEntity } from "../../../../core/infra/data/database/entities/user";
import { User } from "../../domain/models/user";

interface UserParams {
  uid?: string;
  nome: string;
  senha: string;
}

export class UserRepository {
  async create(data: UserParams): Promise<User> {
    const userEntity = UserEntity.create({
      nome: data.nome,
      senha: data.senha,
    });

    await userEntity.save();

    return this.mapperFromEntityToModel(userEntity);
  }

  private mapperFromEntityToModel(entity: UserEntity): User {
    return {
      uid: entity.uid,
      name: entity.nome,
      password: entity.senha,
    };
  }
}
