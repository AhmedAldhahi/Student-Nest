import { User as DomainUser } from "../../../Core/entites/user.entity"; // Your class
import { User as TypeOrmUser } from "../orm/TypeOrm/entity/User.entity";

export class UserMapper {
  /**
   * Converts a TypeORM database entity to a Domain entity (your class).
   */
  public static toDomain(dbUser: TypeOrmUser): DomainUser {
    const domainUser = new DomainUser();

    // We MUST use the setters to create the domain object.
    // This enforces our business logic.
    domainUser.setUserId(dbUser.userId);
    domainUser.setName(dbUser.Name);
    domainUser.setEmail(dbUser.Email);
    domainUser.setPass(dbUser.Password); // Sets the hashed password
    domainUser.setRole(dbUser.Role);
    domainUser.setDateOfBirth(dbUser.DateOfBirth);
    domainUser.setPhoneNumber(dbUser.PhoneNumber);

    if (dbUser.setOtpCode) {
      domainUser.setOtpCode(dbUser.otpCode);
    }
    if (dbUser.getOtpExpired) {
      domainUser.setOtpExpired(dbUser.otpExpired);
    }

    // Handle optional properties
    if (dbUser.Photo) {
      domainUser.setPhoto(dbUser.Photo);
    }
    if (dbUser.Address) {
      domainUser.setAddress(dbUser.Address);
    }

    // --- This is the fix for the problem I describe below ---

    // Set the account status from the DB
    domainUser.setAccountStatus(dbUser.isActive);

    return domainUser;
  }

  /**
   * Converts a Domain entity back to a TypeORM entity to be saved.
   */
  public static toPersistence(domainUser: DomainUser): TypeOrmUser {
    const dbUser = new TypeOrmUser();

    // We use the getters to get the data
    dbUser.userId = domainUser.getUserId();
    dbUser.Name = domainUser.getName();
    dbUser.Email = domainUser.getEmail();
    dbUser.Password = domainUser.getPassword();
    dbUser.Role = domainUser.getRole();
    dbUser.DateOfBirth = domainUser.getDateOfBirth();
    dbUser.PhoneNumber = domainUser.getPhoeNumber();
    dbUser.emailVerfied = domainUser.getVerfiedEmail();
    dbUser.isActive = domainUser.getAccountStatus(); // You'll need to add this getter
    dbUser.Photo = domainUser.getPhoto();
    dbUser.Address = domainUser.getAddress();

    return dbUser;
  }
}
