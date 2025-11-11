import * as bcrypt from "bcrypt";
import { IPasswordService } from "../../../Core/services/IPasswordService.service";

export class BcryptPasswordHasher implements IPasswordService {
  private readonly saltRounds = 10;

  async compare(plain: string, hash: string): Promise<boolean> {
    return bcrypt.compare(plain, hash);
  }

  async hash(plain: string): Promise<string> {
    return bcrypt.hash(plain, this.saltRounds);
  }
}
