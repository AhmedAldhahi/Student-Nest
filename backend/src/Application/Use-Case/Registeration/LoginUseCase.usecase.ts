import { IUnitOfWork } from "../../../Domain/Repositories/UnitOfWorkRepositories.repositories";
import { IPasswordService } from "../../Interfaces/IPassword.interface";
import { ITokenService } from "../../Interfaces/IToken.interface";
import { LoginRequest } from "../../Dtos/registeration/LoginRequest.dtos";
import { LoginResponse } from "../../Dtos/registeration/LoginRespone.dtos";

export class LoginUseCase {
  constructor(
    private readonly unitOfWork: IUnitOfWork,
    private readonly tokenService: ITokenService,
    private readonly passwordService: IPasswordService
  ) {}
  public async execute(dto: LoginRequest): Promise<LoginResponse> {
    try {
      // 1. Start Transaction (Optional for read-only, but good for consistency)
      await this.unitOfWork.startTransaction();

      // 2. Find User
      const user = await this.unitOfWork.userRepo.findByEmail(dto.email);

      if (!user) {
        throw new Error("the password or email not correct");
      }

      // 3. Check Password
      const isValid = await this.passwordService.compare(
        dto.password,
        user.getPass()
      );

      // console.log(dto.password, user.getPass()); // Remove logs in production

      if (!isValid) {
        throw new Error("the password or email not correct");
      }

      const verifiedEmail = user.getVerifiedEmail();

      // REMOVED: await this.unitOfWork.userRepo.addNewUser(user);
      // You do not need to save the user again just to log them in.

      // 4. Generate Token
      const payload = {
        userId: user.getUserId(),
      };

      const Token = await this.tokenService.generateAccessToken(payload);

      await this.unitOfWork.commitTransaction();

      return {
        message: "user login scussfuly",
        token: Token,
        verifiedEmail: verifiedEmail,
      };
    } catch (err: any) {
      await this.unitOfWork.rollbackTransaction();
      if (err instanceof Error) {
        // It is better to log the actual error for debugging
        console.error(err.message);
      }
      throw err;
    }
  }
}
