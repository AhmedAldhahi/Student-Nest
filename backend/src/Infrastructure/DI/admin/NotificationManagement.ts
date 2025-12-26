import { DeleteAllNotificationCommandHandler } from "../../../Application/Command/Handlers/DeleteAllNotificationCommandHandler";
import { deleteNotificationByIdCommandHandler } from "../../../Application/Command/Handlers/DeleteNotificationByIdCommandHandler";
import { deleteSpecificNotificationsCommandHandler } from "../../../Application/Command/Handlers/DeleteSpecificationNotificationCommandHandler";
import { UpdateNotificationStatusCommandHandler } from "../../../Application/Command/Handlers/updateNotifcationStatusCommandHandler";
import { GetAllNotificationQueriesHandler } from "../../../Application/Queries/Handlers/GetAllNotifcationQueriesHandler";
import { DeleteAllNotificationUseCase } from "../../../Application/Use-Case/admin/NotifcationMangement/DeleteAllNotification.usecase";
import { DeleteNotificationByIdUseCase } from "../../../Application/Use-Case/admin/NotifcationMangement/DeleteNotificationById.usecase";
import { DeleteSpecificNotificationsUseCase } from "../../../Application/Use-Case/admin/NotifcationMangement/DeleteSpecificNotification.usecase";
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

export function deleteNotificationById(): DeleteNotificationByIdUseCase {
  const uow = new UnitOfWork();
  const readNotificationRepo = new readNotificationRepositories();

  const commandHandler = new deleteNotificationByIdCommandHandler(
    uow,
    readNotificationRepo
  );
  return new DeleteNotificationByIdUseCase(commandHandler);
}

export function deleteAllNotification(): DeleteAllNotificationUseCase {
  const uow = new UnitOfWork();
  const commandHandler = new DeleteAllNotificationCommandHandler(uow);

  return new DeleteAllNotificationUseCase(commandHandler);
}

export function DeleteSpecificNotifications(): DeleteSpecificNotificationsUseCase {
  const uow = new UnitOfWork();
  const commandHandler = new deleteSpecificNotificationsCommandHandler(uow);
  return new DeleteSpecificNotificationsUseCase(commandHandler);
}
