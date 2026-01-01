import { StudentAggregateRoot } from "../AgregatesRoot/studentEntity.entity";

export interface IWriteStudentRepositories { 
  addNewStudent (user: StudentAggregateRoot ) : Promise<void>;
  updateStudent (user: StudentAggregateRoot ): Promise<void>;
}


