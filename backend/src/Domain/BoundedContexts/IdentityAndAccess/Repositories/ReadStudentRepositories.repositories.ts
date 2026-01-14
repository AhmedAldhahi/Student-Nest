import { StudentAggregateRoot } from "../Aggregates/StudentAggregateRoot.entity";

export interface StudentResponseDto {
  user: UserResponseDTO;
  GraduationYear: number;
  Major: string;
  studentCardID: string;
  userGovId: string;
  universityName: string;
  studentValidateDocument: string;
}

export interface UserResponseDTO {
  userId: string;
  name: string;
  dateOfBirth: string;
  email: string;
  role: string;
  phoneNumber: string;
  address?: string;
  photo?: string;
  createdAt: Date;
  emailVerified: boolean;
}

export interface IReadStudentRepositories {
  findStudentById(userId: string): Promise<StudentAggregateRoot | null>;
  findAllStudent(): Promise<StudentResponseDto[] | null>;
  searchByQuery(prefix: string): Promise<StudentResponseDto[] | null>;
}
