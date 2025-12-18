import { IQueries } from "./IQuerie";

export interface IQueriesHandlers<TQueries extends IQueries> {
  handle(command?: TQueries): Promise<any>;
}
