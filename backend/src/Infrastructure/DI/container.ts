import { LoginUseCase } from "../../Application/use-case/LoginUseCase.usecase";
import {
  makeLoginUseCase,
  makeRegisterLandlordUseCase,
  makeRegisterStudentUseCase,
} from "./usecase.DI";

export function buildDependencies() {
  return {
    useCases: {
      registerLandlordUseCase: makeRegisterLandlordUseCase(),
      registerStudentUseCase: makeRegisterStudentUseCase(),
      LoginUseCase: makeLoginUseCase(),
    },
  };
}
