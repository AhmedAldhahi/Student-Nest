import { UserRole } from "../../Core/enum/UserRole.enum";

export interface RegisterStudentRequest {
    // require
    email: string;
    name: string;
    password: string;
    role: UserRole.student;
    dateOfBirth: Date;
    phoneNumber: string;
    major: string;
    graduatYear: number;
    studentCardId: string;
    unversityName: string;
    studentGovId: string;

    address? : string; 
}




