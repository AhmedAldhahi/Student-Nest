import { StudentAggregateRoot } from "../Aggregates/StudentAggregateRoot.entity";

export interface IWriteStudentRepositories { 
  addNewStudent (user: StudentAggregateRoot ) : Promise<void>;
  updateStudent (user: StudentAggregateRoot ): Promise<void>;
}


