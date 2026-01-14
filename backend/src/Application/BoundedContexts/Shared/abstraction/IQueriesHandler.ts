import { IQueries } from "./IQueries";

export interface IQueriesHandlers<TQueries extends IQueries> {
  handle(command?: TQueries): Promise<any>;
}
