import { Request, Response } from "express";
// Use the path to your Use Case
import { RegisterStudentUseCase } from "../../../Application/use-case/RegisterStudentUseCase.usecase";
import { RegisterLandloardUseCase } from "../../../Application/use-case/RegisterLandloardUseCase.usecase";
import { LoginUseCase } from "../../../Application/use-case/LoginUseCase.usecase";

export class AuthController {
  constructor(
   // private registerStudentUseCase: RegisterStudentUseCase,
    private registerLandlordUseCase: RegisterLandloardUseCase,
    //private loginUserUseCase: LoginUseCase
  ) {}
  public registerLandloard = async (req: Request, res: Response) => {
    try {
      const dto = req.body;
      const result = await this.registerLandlordUseCase.execute(dto);
      // scussfuly
      return res.status(201).json(result);
    } catch (err: any) {
      const status = err.statusCode;
      return res.status(400).json({ err: err.message || "server error" });
    }
  };
  // public registerStudent = async (
  //   req: Request,
  //   res: Response
  // ): Promise<Response> => {
  //   try {
  //     const dto = req.body;

  //     const result = await this.registerStudentUseCase.execute(dto);

  //     return res.status(201).json(result);
  //   } catch (error: any) {
  //     if (error.message === "Email already taken.") {
  //       return res.status(409).json({ message: error.message });
  //     }

  //     const status = error.statusCode || 400;
  //     return res
  //       .status(status)
  //       .json({ error: error.message || "Server error" });
  //   }
  // };

  // public loginUser = async (req: Request, res: Response): Promise<Response> => {
  //   try {
  //     const dto = req.body;
  //     const result = await this.loginUserUseCase.execute(dto);

  //     return res.status(201).json(result);
  //   } catch (err: any) {
  //     const status = err.statusCode || 400;

  //     return res
  //       .status(status)
  //       .json({ err: err.message || "internal server error" });
  //   }
  // };
}
