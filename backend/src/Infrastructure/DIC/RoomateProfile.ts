import { CreateRoommateProfileCommandHandler } from "../../Application/BoundedContexts/RoommateProfile/CommandHandler/CreateRoommateProfileCommandHandler";
import { ReadRoommateProfileRepositories } from "../Repositories/Read/ReadRoommateProfileRepositories";
import { ReadStudentRepositories } from "../Repositories/Read/ReadStudentRepositories";
import { ReadUserRepositories } from "../Repositories/Read/ReadUserRepositories";
import { UnitOfWork } from "../Repositories/unitOfWork.repositories";

export function createRoommateProfileCH(): CreateRoommateProfileCommandHandler {
  const readUserRepo = new ReadUserRepositories();
  const readStudentRepo = new ReadStudentRepositories();
  const uow = new UnitOfWork();
  const readRoommateProfileRepo = new ReadRoommateProfileRepositories();

  return new CreateRoommateProfileCommandHandler(
    readUserRepo,
    readStudentRepo,
    readRoommateProfileRepo,
    uow,
  );
}
