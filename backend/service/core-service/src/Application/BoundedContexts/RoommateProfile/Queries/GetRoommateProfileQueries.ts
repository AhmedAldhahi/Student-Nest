import { IQueries } from "../../Shared/abstraction/IQueries";

export class GetRoommateProfileQueries implements IQueries {
  userId: string;
  constructor(userId: string) {
    this.userId = userId;
  }
}
