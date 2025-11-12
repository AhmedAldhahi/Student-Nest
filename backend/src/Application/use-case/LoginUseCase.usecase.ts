import { IUnitOfWorkRepository } from "../../Core/repositories/UnitOfWorkRepository.repository";
import { IPasswordService } from "../../Core/services/IPasswordService.service";
import { ITokenService } from "../../Core/services/ITokenService.service";
import { LoginRequest } from "../dtos/LoginRequest.dtos";
import { LoginResponse } from "../dtos/LoginRespone.dtos";

export class LoginUseCase {
  constructor(
    private readonly unitOfWork: IUnitOfWorkRepository,
    private readonly tokenService: ITokenService,
    private readonly passwordService: IPasswordService
  ) {}

  public async execute(dto: LoginRequest): Promise<LoginResponse> {
    try {
      await this.unitOfWork.startTransaction();

      const user = await this.unitOfWork.userRepotories.findByEmail(dto.email);

      if (!user) {
        throw new Error("the password or email not correct ");
      }


      const isValid = await this.passwordService.compare(
        dto.password,
        user.getPassword()
      );

      console.log(dto.password, user.getPassword())

      if (!isValid) {
        throw new Error("the password or email not correct 1 ");
      }

      // be ready to
      await this.unitOfWork.userRepotories.save(user);

      const payload = {
        userId: user.getUserId(),
      };

      const Token = await this.tokenService.generateAccessToken(payload);

      await this.unitOfWork.commit();

      return {
        message: "user login scussfuly",
        token: Token,
      }; 
    } catch (err: any) {
      await this.unitOfWork.rollBack();
      if (err instanceof Error) {
        console.error("failed to login to the our system !!");
      }
      throw err;
    }
  }
}
