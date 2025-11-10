import { Request, Response } from "express";
// Use the path to your Use Case
import { RegisterStudentUseCase } from "../../../Application/use-case/RegisterStudentUseCase.usecase";

export class AuthController {
  // 1. The Use Case is injected via the constructor
  constructor(private registerStudentUseCase: RegisterStudentUseCase) {}

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
}
