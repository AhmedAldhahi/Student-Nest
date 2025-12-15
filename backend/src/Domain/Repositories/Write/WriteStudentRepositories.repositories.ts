import { StudentAggregateRoot } from "../../AggregatesRoot/studentEntity.entity";

export interface IWriteStudentRepositories { 
  addNewStudent (user: StudentAggregateRoot ) : Promise<void>;
  updateStudent (user: StudentAggregateRoot ): Promise<void>;
}


