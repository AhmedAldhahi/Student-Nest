import { UserResponseDTO } from "./ UserResponseDTO";

export interface StudentResponseDto {
  user: UserResponseDTO;
  GraduationYear: number;
  Major: string;
  studentCardID: string;
  userGovId: string;
  universityName: string;
  studentValidateDocument: string;
}