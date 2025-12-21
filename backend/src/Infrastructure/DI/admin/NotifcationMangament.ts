import { GetAllNotificationQueriesHandler } from "../../../Application/Querie/Handlers/GetAllNotifcationQueriesHandler";
import { GetAllNotificationUseCase } from "../../../Application/Use-Case/admin/NotifcationMangement/GetAllNotifcation.usecase";
import { readNotificationRepositories } from "../../Repositories/Read/ReadNotificationRepositories";

export function GetAllNotification(): GetAllNotificationUseCase {
  const readNotificationRepo = new readNotificationRepositories();

  const queriesHandler = new GetAllNotificationQueriesHandler(
    readNotificationRepo
  );
  return new GetAllNotificationUseCase(queriesHandler);
}

export function updateNotificationStatus() {}
