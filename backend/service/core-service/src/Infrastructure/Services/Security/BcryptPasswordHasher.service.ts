import * as bcrypt from "bcrypt";
import { IPasswordService } from "../../../Application/Interfaces/IPassword.interface";
export class BcryptPasswordHasher implements IPasswordService {
  private readonly saltRounds = 10;

  async compare(plain: string, hash: string): Promise<boolean> {
    return bcrypt.compare(plain, hash);
  }

  async hash(plain: string): Promise<string> {
    return bcrypt.hash(plain, this.saltRounds);
  }
}
