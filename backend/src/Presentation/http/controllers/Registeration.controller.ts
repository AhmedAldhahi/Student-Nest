import { Request, Response } from "express";
// Use the path to your Use Case
import { RegisterStudentUseCase } from "../../../Application/use-case/RegisterStudentUseCase.usecase";
import { RegisterLandloardUseCase } from "../../../Application/use-case/RegisterLandloardUseCase.usecase";
export class AuthController {
  // 1. The Use Case is injected via the constructor
  constructor(
    private registerStudentUseCase: RegisterStudentUseCase,
    private registerLandloardUseCase: RegisterLandloardUseCase
  ) {}

  public registerStudent = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const dto = req.body;

      const result = await this.registerStudentUseCase.execute(dto);

      return res.status(201).json(result);
    } catch (error: any) {
      if (error.message === "Email already taken.") {
        return res.status(409).json({ message: error.message });
      }

      const status = error.statusCode || 400;
      return res
        .status(status)
        .json({ error: error.message || "Server error" });
    }
  };

  public registerLandloard = async (req: Request, res: Response) => {
    // take request
    // assignment to the use case
    // respone to error

    try {
      const dto = req.body;
      const result = await this.registerLandloardUseCase.execute(dto);
      // scussful
      return res.status(201).json(result);
    } catch (err: any) {
      const status = err.statusCode;
      return res.status(status).json({ err: err.message || "server error" });
    }
  }; 
}
