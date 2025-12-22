import { UpdateNotificationStatusCommandHandler } from "../../../Application/Command/Handlers/updateNotifcationStatusCommandHandler";
import { GetAllNotificationQueriesHandler } from "../../../Application/Querie/Handlers/GetAllNotifcationQueriesHandler";
import { GetAllNotificationUseCase } from "../../../Application/Use-Case/admin/NotifcationMangement/GetAllNotifcation.usecase";
import { UpdateNotificationStatusUseCase } from "../../../Application/Use-Case/admin/NotifcationMangement/UpdateNotifcationStatus.usecase";
import { readNotificationRepositories } from "../../Repositories/Read/ReadNotificationRepositories";
import { UnitOfWork } from "../../Repositories/unitOfWork.repositories";

export function GetAllNotification(): GetAllNotificationUseCase {
  const readNotificationRepo = new readNotificationRepositories();

  const queriesHandler = new GetAllNotificationQueriesHandler(
    readNotificationRepo
  );
  return new GetAllNotificationUseCase(queriesHandler);
}

export function updateNotificationStatus(): UpdateNotificationStatusUseCase {
  const uow = new UnitOfWork();
  const readNotificationRepo = new readNotificationRepositories();

  const commandHandler = new UpdateNotificationStatusCommandHandler(
    uow,
    readNotificationRepo
  );

  return new UpdateNotificationStatusUseCase(commandHandler);
}
