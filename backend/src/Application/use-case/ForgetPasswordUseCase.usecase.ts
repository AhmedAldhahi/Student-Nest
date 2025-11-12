import { th } from "zod/v4/locales";
import { IUnitOfWorkRepository } from "../../Core/repositories/UnitOfWorkRepository.repository";
import { IPasswordService } from "../../Core/services/IPasswordService.service";
import { ITokenService } from "../../Core/services/ITokenService.service";
import { ForgetPasswordRequest } from "../dtos/ForgetPasswordRequest.dtos";
import { NoUserExistException } from "../Error/NoUseExictException.error";
import { PasswordBeenUsedBeforeException } from "../Error/PasswordUsedBeforeException.error";

export class ForgetPasswordUseCase {
  constructor(
    private readonly unitOfWork: IUnitOfWorkRepository,
    private readonly tokenService: ITokenService,
    private readonly passwordService: IPasswordService
  ) {}

  public async execute(dto: ForgetPasswordRequest) {
    await this.unitOfWork.startTransaction();
    try {
      const user = await this.unitOfWork.userRepotories.findByEmail(dto.email);
      if (!user) {
        throw new NoUserExistException();
      }

      const currentHashedPassword = user.getPassword();

      const isUsedBefore = await this.passwordService.compare(
        dto.password,
        currentHashedPassword
      );

      if (isUsedBefore) {
        throw new PasswordBeenUsedBeforeException();
      }

      // 3. Hash the new password *after* the check
      const newHashedPassword = await this.passwordService.hash(dto.password);

      // 4. Set the NEW HASH on the user object (This is the security fix)
      user.setPass(newHashedPassword);

      await this.unitOfWork.userRepotories.save(user);

      const payload = {
        userId: user.getUserId(),
      };

      const Token = await this.tokenService.generateAccessToken(payload);

      await this.unitOfWork.commit();

      return {
        message: "user password been update scussfuly ",
        token: Token,
      };
    } catch (err: any) {
      await this.unitOfWork.rollBack();
      if (err instanceof Error) {
        console.error("failed to update  password !!", err);
      }

      throw err;
    }
  }
}
