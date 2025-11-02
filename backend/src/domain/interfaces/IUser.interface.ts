import { UserRole } from "../enum/UserRole.enum";

/**
 * Represents a system user, which may be a student, landlord, or administrator.
 *
 * @interface IUser
 * @category Domain
 * @property {number} userId - Unique identifier of the user.
 * @property {string} email - User's email address.
 * @property {string} emailVerfied - Indicates whether the email has been verified.
 * @property {string} name - Full name of the user.
 * @property {string} password - Hashed password for authentication.
 * @property {UserRole} role - The assigned role of the user (admin, landlord, or student).
 * @property {Date} dateOfBirth - User's date of birth.
 * @property {string} [photo] - Optional URL to the user's profile photo.
 * @property {string} phoneNumber - User's phone number.
 * @property {string} [address] - Optional physical address of the user.
 * @property {boolean} isActive - Indicates if the user account is active.
 */ 

export interface IUser {
  userId: number;
  email: string;
  emailVerfied: boolean;
  name: string;
  password: string;
  role: UserRole;
  dateOfBirth: Date;
  photo?: string;
  phoneNumber: string;
  address?: string;
  isActive: boolean;
}

/**
 * Represents a student account and its associated academic details.
 *
 * @interface IStudent
 * @extends IUser
 * @category Domain
 * @property {string} major - The student's field of study.
 * @property {string} graduateYear - Expected year of graduation.
 * @property {string} unversityName - Name of the university the student attends.
 * @property {string} studnetCardId - Unique student ID issued by the university.
 * @property {string} [walletAddress] - Optional blockchain wallet address linked to the student.
 * @property {string} student_Gov_Id - Government-issued identification for verification.
 */
export interface IStudent {
  major: string;
  graduateYear: string;
  unversityName: string;
  studnetCardId: string;
  walletAddress?: string;
  student_Gov_Id: string;
}

/**
 * Represents a landlord account responsible for managing properties or accommodations.
 *
 * @interface ILandloard
 * @extends IUser
 * @category Domain
 * @property {string} cliQAccount - Linked CliQ bank account identifier for payments.
 * @property {boolean} verfied - Indicates if the landlord has completed identity verification.
 * @property {string} landloard_Gov_Id - Government-issued ID for the landlord.
 */
export interface ILandloard {
  cliQAccount: string;
  verfied: boolean;
  landloard_Gov_Id: string;
}
