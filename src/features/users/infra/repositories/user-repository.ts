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

  async getAll(): Promise<User[]> {
    const userEntities = await UserEntity.find();

    return userEntities.map((userEntity) =>
      this.mapperFromEntityToModel(userEntity)
    );
  }

  async getByUid(uid: string): Promise<User | undefined> {
    const userEntity = await UserEntity.findOne(uid);

    if (!userEntity) return undefined;

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