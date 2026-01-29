import { deleteAdminNotificationByIdCommandHandler } from "../../../Application/BoundedContexts/Notification/CommandHandler/DeleteAdminNotificationByIdCommandHandler";
import { DeleteAllAdminNotificationCommandHandler } from "../../../Application/BoundedContexts/Notification/CommandHandler/DeleteAllAdminNotificationCommandHandler";
import { DeleteAllNotificationCommandHandler } from "../../../Application/BoundedContexts/Notification/CommandHandler/DeleteAllNotificationCommandHandler";
import { deleteNotificationByIdCommandHandler } from "../../../Application/BoundedContexts/Notification/CommandHandler/DeleteNotificationByIdCommandHandler";
import { deleteSpecificNotificationsCommandHandler } from "../../../Application/BoundedContexts/Notification/CommandHandler/DeleteSpecificationNotificationCommandHandler";
import { UpdateNotificationStatusCommandHandler } from "../../../Application/BoundedContexts/Notification/CommandHandler/updateNotifcationStatusCommandHandler";
import { GetAllAdminNotificationQueriesHandler } from "../../../Application/BoundedContexts/Notification/QueriesHandler/GetAllAdminNotificationQueriesHandler";
import { GetAllNotificationQueriesHandler } from "../../../Application/BoundedContexts/Notification/QueriesHandler/GetAllNotifcationQueriesHandler";
import { AdminNotificationsStrategy } from "../../../Application/BoundedContexts/Shared/Strategy/notification/AdminNotification.strategy";
import { NotificationContext } from "../../../Application/BoundedContexts/Shared/Strategy/notification/notificationContext";
import { UserNotificationsStrategy } from "../../../Application/BoundedContexts/Shared/Strategy/notification/UserNotifications.strategy";
import { readNotificationRepositories } from "../../Repositories/Read/ReadNotificationRepositories";
import { ReadUserRepositories } from "../../Repositories/Read/ReadUserRepositories";
import { UnitOfWork } from "../../Repositories/unitOfWork.repositories";

export function notificationContext(): NotificationContext {
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

  return new NotificationContext(
    userNotificationStrategy,
    adminNotificationsStrategy,
    readUserRepositories
  );
}

export function updateNotificationStatus(): UpdateNotificationStatusCommandHandler {
  const uow = new UnitOfWork();
  const readNotificationRepo = new readNotificationRepositories();

  return new UpdateNotificationStatusCommandHandler(uow, readNotificationRepo);
}

export function DeleteSpecificNotifications(): deleteSpecificNotificationsCommandHandler {
  const uow = new UnitOfWork();
  return new deleteSpecificNotificationsCommandHandler(uow);
}
