import { makeRegisterLandlordUseCase } from "./usecase.DI";

export function buildDependencies() {
  return {
    useCases: {
      registerLandlordUseCase: makeRegisterLandlordUseCase(),
    },
  };
}
