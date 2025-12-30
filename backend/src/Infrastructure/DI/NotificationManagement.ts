import { deleteAdminNotificationByIdCommandHandler } from "../../Application/Command/Handlers/DeleteAdminNotificationByIdCommandHandler";
import { DeleteAllAdminNotificationCommandHandler } from "../../Application/Command/Handlers/DeleteAllAdminNotificationCommandHandler";
import { DeleteAllNotificationCommandHandler } from "../../Application/Command/Handlers/DeleteAllNotificationCommandHandler";
import { deleteNotificationByIdCommandHandler } from "../../Application/Command/Handlers/DeleteNotificationByIdCommandHandler";
import { deleteSpecificNotificationsCommandHandler } from "../../Application/Command/Handlers/DeleteSpecificationNotificationCommandHandler";
import { UpdateNotificationStatusCommandHandler } from "../../Application/Command/Handlers/updateNotifcationStatusCommandHandler";
import { GetAllAdminNotificationQueriesHandler } from "../../Application/Queries/Handlers/GetAllAdminNotificationQueriesHandler";
import { GetAllNotificationQueriesHandler } from "../../Application/Queries/Handlers/GetAllNotifcationQueriesHandler";
import { AdminNotificationsStrategy } from "../../Application/Strategy/notification/AdminNotification.strategy";
import { NotificationContext } from "../../Application/Strategy/notification/notificationContext";
import { UserNotificationsStrategy } from "../../Application/Strategy/notification/UserNotifications.strategy";
import { DeleteAllNotificationUseCase } from "../../Application/Use-Case/NotifcationMangement/DeleteAllNotification.usecase";
import { DeleteNotificationByIdUseCase } from "../../Application/Use-Case/NotifcationMangement/DeleteNotificationById.usecase";
import { DeleteSpecificNotificationsUseCase } from "../../Application/Use-Case/NotifcationMangement/DeleteSpecificNotification.usecase";
import { GetAllNotificationUseCase } from "../../Application/Use-Case/NotifcationMangement/GetAllNotifcation.usecase";
import { UpdateNotificationStatusUseCase } from "../../Application/Use-Case/NotifcationMangement/UpdateNotifcationStatus.usecase";
import { readNotificationRepositories } from "../Repositories/Read/ReadNotificationRepositories";
import { ReadUserRepositories } from "../Repositories/Read/ReadUserRepositories";
import { UnitOfWork } from "../Repositories/unitOfWork.repositories";

export function GetAllNotification(): GetAllNotificationUseCase {
  // repo
  const readNotificationRepo = new readNotificationRepositories();
  const readUserRepositories = new ReadUserRepositories();
  const uow = new UnitOfWork();

  // query handler

  const GetAllNotificationForUsersQueriesHandler =
    new GetAllNotificationQueriesHandler(readNotificationRepo);

  const GetAdminNotificationForAdminQueriesHandler =
    new GetAllAdminNotificationQueriesHandler(readNotificationRepo);

  const DeleteAllAdminNotificationCH =
    new DeleteAllAdminNotificationCommandHandler(uow, readUserRepositories);

  const DeleteAllNotificationCH = new DeleteAllNotificationCommandHandler(uow);

  const DeleteAdminNotificationByIdCH =
    new deleteAdminNotificationByIdCommandHandler(uow, readNotificationRepo);

  const DeleteNotificationById = new deleteNotificationByIdCommandHandler(
    uow,
    readNotificationRepo
  );

  // strategy

  const userNotificationStrategy = new UserNotificationsStrategy(
    GetAllNotificationForUsersQueriesHandler,
    DeleteAllNotificationCH,
    DeleteNotificationById
  );

  const adminNotificationsStrategy = new AdminNotificationsStrategy(
    GetAdminNotificationForAdminQueriesHandler,
    DeleteAllAdminNotificationCH,
    DeleteAdminNotificationByIdCH
  );

  const contextNotification = new NotificationContext(
    userNotificationStrategy,
    adminNotificationsStrategy
  );

  return new GetAllNotificationUseCase(
    contextNotification,
    readUserRepositories
  );
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
  const readNotificationRepo = new readNotificationRepositories();
  const readUserRepositories = new ReadUserRepositories();
  const uow = new UnitOfWork();

  // query handler

  const GetAllNotificationForUsersQueriesHandler =
    new GetAllNotificationQueriesHandler(readNotificationRepo);

  const GetAdminNotificationForAdminQueriesHandler =
    new GetAllAdminNotificationQueriesHandler(readNotificationRepo);

  const DeleteAllAdminNotificationCH =
    new DeleteAllAdminNotificationCommandHandler(uow, readUserRepositories);

  const DeleteAllNotificationCH = new DeleteAllNotificationCommandHandler(uow);

  const DeleteAdminNotificationByIdCH =
    new deleteAdminNotificationByIdCommandHandler(uow, readNotificationRepo);

  const DeleteNotificationById = new deleteNotificationByIdCommandHandler(
    uow,
    readNotificationRepo
  );

  // strategy

  const userNotificationStrategy = new UserNotificationsStrategy(
    GetAllNotificationForUsersQueriesHandler,
    DeleteAllNotificationCH,
    DeleteNotificationById
  );

  const adminNotificationsStrategy = new AdminNotificationsStrategy(
    GetAdminNotificationForAdminQueriesHandler,
    DeleteAllAdminNotificationCH,
    DeleteAdminNotificationByIdCH
  );

  const contextNotification = new NotificationContext(
    userNotificationStrategy,
    adminNotificationsStrategy
  );

  return new DeleteNotificationByIdUseCase(
    contextNotification,
    readUserRepositories
  );
}

export function deleteAllNotification(): DeleteAllNotificationUseCase {
  // repo
  const readNotificationRepo = new readNotificationRepositories();
  const readUserRepositories = new ReadUserRepositories();
  const uow = new UnitOfWork();

  // query handler

  const GetAllNotificationForUsersQueriesHandler =
    new GetAllNotificationQueriesHandler(readNotificationRepo);

  const GetAdminNotificationForAdminQueriesHandler =
    new GetAllAdminNotificationQueriesHandler(readNotificationRepo);

  const DeleteAllAdminNotificationCH =
    new DeleteAllAdminNotificationCommandHandler(uow, readUserRepositories);

  const DeleteAllNotificationCH = new DeleteAllNotificationCommandHandler(uow);
  // strategy

  const DeleteAdminNotificationByIdCH =
    new deleteAdminNotificationByIdCommandHandler(uow, readNotificationRepo);

  const DeleteNotificationById = new deleteNotificationByIdCommandHandler(
    uow,
    readNotificationRepo
  );

  const userNotificationStrategy = new UserNotificationsStrategy(
    GetAllNotificationForUsersQueriesHandler,
    DeleteAllNotificationCH,
    DeleteNotificationById
  );

  const adminNotificationsStrategy = new AdminNotificationsStrategy(
    GetAdminNotificationForAdminQueriesHandler,
    DeleteAllAdminNotificationCH,
    DeleteAdminNotificationByIdCH
  );

  const contextNotification = new NotificationContext(
    userNotificationStrategy,
    adminNotificationsStrategy
  );

  return new DeleteAllNotificationUseCase(
    contextNotification,
    readUserRepositories
  );
}

export function DeleteSpecificNotifications(): DeleteSpecificNotificationsUseCase {
  const uow = new UnitOfWork();
  const commandHandler = new deleteSpecificNotificationsCommandHandler(uow);
  return new DeleteSpecificNotificationsUseCase(commandHandler);
}
