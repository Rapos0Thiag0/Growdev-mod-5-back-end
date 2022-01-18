import { MensagemEntity } from "../../../../core/infra/data/database/entities/mensagem";

export interface User {
  uid: string;
  name: string;
  password: string;
  messages?: Array<MensagemEntity>;
}
