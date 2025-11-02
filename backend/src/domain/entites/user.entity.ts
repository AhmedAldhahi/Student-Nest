import { UserRole } from "../enum/UserRole.enum";
import { IUser } from "../interfaces/IUser.interface";


export abstract class User implements IUser {
  private userId: number;
  private email: string;
  private emailVerfied: boolean;
  private name: string;
  private password: string;
  private role: UserRole;
  private dateOfBirth: Date;
  private phoneNumber: string;
  private isActive: boolean;
  private photo?: string;
  private address?: string;

  constructor(
    userId: number,
    email: string,
    emailVerfied: boolean,
    name: string,
    password: string,
    role: UserRole,
    dateOfBirth: Date,
    phoneNumber: string,
    isActive: boolean,
    address?: string,
    photo?: string
  ) {
    this.userId = userId;
    this.email = email;
    this.emailVerfied = emailVerfied;
    this.name = name;
    this.password = password;
    this.role = role;
    this.dateOfBirth = dateOfBirth;
    this.phoneNumber = phoneNumber;
    this.isActive = isActive;
    this.address = address;
    this.photo = photo;
  }

  // ===== Generic Getters and Setters =====

  public get getUserId() : number { 
    return this.userId;
} 

public set setUserId(userId: number)  {
    this.userId = userId;
}

  public get getUserEmail(): string {
    return this.email;
  }

  public set setUserEmail(userEmail: string) {
    this.email = userEmail;
  }

  

  public get getUserEmailVerfied(): boolean {
    return this.emailVerfied;
  }
public set setUserEmailVerfied(userEmailVerfid: boolean) {
    this.emailVerfied =userEmailVerfid;
} 

  public get getUserName(): string {
    return this.name;
  }
  public getUserRole(): UserRole {
    return this.role;
  }

  public getDateOfBirth(): Date {
    return this.dateOfBirth;
  }

  public getPhoneNumber(): string {
    return this.phoneNumber;
  }

  public getUserIsActive() : boolean {
    return this.isActive;
  }

  public getUserAddress(){
    return this.address? this.address: null;
  } 

  public getUserPhoto() {
    return this.photo? this.photo : null;
  }

  public getUserPass(): string {
    return this.password;
  } 


}

