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
    domainUser.setName(dbUser.Name); // <-- Fixed typo (was dbBser)
    domainUser.setEmail(dbUser.Email);
    domainUser.setPass(dbUser.Password); // Sets the hashed password
    domainUser.setRole(dbUser.Role);
    domainUser.setDateOfBirth(dbUser.DateOfBirth);
    domainUser.setPhoneNumber(dbUser.PhoneNumber);

    // Use the correct setter to load the value from the DB
    domainUser.setEmailVerfiedStatus(dbUser.emailVerfied);

    // This is correct, as dbUser.otpCode can be 'null'
    // and setOtpCode handles 'undefined' or a 'string'
    if (dbUser.otpCode) {
      domainUser.setOtpCode(dbUser.otpCode);
    }
    if (dbUser.otpExpired) {
      domainUser.setOtpExpired(dbUser.otpExpired);
    }
    // Handle optional properties
    if (dbUser.Photo) {
      domainUser.setPhoto(dbUser.Photo);
    }
    if (dbUser.Address) {
      domainUser.setAddress(dbUser.Address);
    }
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
    dbUser.isActive = domainUser.getAccountStatus(); // <-- Fixed typo (was domain_user)
    dbUser.Photo = domainUser.getPhoto();
    dbUser.Address = domainUser.getAddress();

    // --- THIS IS THE FINAL FIX ---
    // The '??' operator now converts 'null' OR 'undefined' to 'null',
    // which matches the TypeORM entity type 'string | null'.
    dbUser.otpCode = domainUser.getOtpCodeRaw() ?? null;
    dbUser.otpExpired = domainUser.getOtpExpiredRaw() ?? null; // <-- Fixed typo (was domainZser)

    return dbUser;
  }
}
