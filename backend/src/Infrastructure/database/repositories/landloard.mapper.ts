// src/infrastructure/database/repositories/landloard.mapper.ts

import { Landloard as DomainLandlord } from '../../../Core/entites/landloard.entity'; 
import { Landlord as TypeOrmLandloard } from '../orm/TypeOrm/entity/Landloard.entity'; 
import { User as TypeOrmUser } from '../orm/TypeOrm/entity/User.entity';

export class LandlordMapper {
  
  // The 'toDomain' method was correct and remains the same
  public static toDomain(dbLandlord: TypeOrmLandloard): DomainLandlord {
    const domainLandlord = new DomainLandlord();

    if (dbLandlord.user) {
      domainLandlord.setUserId(dbLandlord.user.userId);
      domainLandlord.setName(dbLandlord.user.Name);
      domainLandlord.setEmail(dbLandlord.user.Email);
      domainLandlord.setPass(dbLandlord.user.Password);
      domainLandlord.setRole(dbLandlord.user.Role);
      domainLandlord.setDateOfBirth(dbLandlord.user.DateOfBirth);
      domainLandlord.setPhoneNumber(dbLandlord.user.PhoneNumber);
      domainLandlord.setAccountStatus(dbLandlord.user.isActive);
      
      if (dbLandlord.user.emailVerfied) {
        domainLandlord.setVerfiedEmail();
      }
      if (dbLandlord.user.Photo) {
        domainLandlord.setPhoto(dbLandlord.user.Photo);
      }
      if (dbLandlord.user.Address) {
        domainLandlord.setAddress(dbLandlord.user.Address);
      }
    }
    
    domainLandlord.setCliQAccount(dbLandlord.cliQAccount); 
    domainLandlord.setLandloardGovId(dbLandlord.landloardGovId);

    return domainLandlord;
  }

  /**
   * Converts a single Domain Landlord back into a TypeORM Landlord
   * and a nested TypeORM User for saving.
   */
  public static toPersistence(domainLandlord: DomainLandlord): TypeOrmLandloard {
    // 1. Create the TypeOrmUser and map its properties
    const dbUser = new TypeOrmUser();
    dbUser.userId = domainLandlord.getUserId();
    dbUser.Name = domainLandlord.getName();
    dbUser.Email = domainLandlord.getEmail();
    dbUser.Password = domainLandlord.getPassword();
    dbUser.Role = domainLandlord.getRole();
    dbUser.DateOfBirth = domainLandlord.getDateOfBirth();
    dbUser.PhoneNumber = domainLandlord.getPhoeNumber();
    dbUser.isActive = domainLandlord.getAccountStatus();
    dbUser.emailVerfied = domainLandlord.getVerfiedEmail();
    dbUser.Photo = domainLandlord.getPhoto();
    dbUser.Address = domainLandlord.getAddress();

  
    // 2. Create the TypeOrmLandloard and map its properties
    const dbLandlord = new TypeOrmLandloard();

    // 3. Map Landlord-specific properties
    dbLandlord.cliQAccount = domainLandlord.getcliQAccount();
    dbLandlord.landloardGovId = domainLandlord.getLandloardGovId();

    // 4. Nest the dbUser inside the dbLandlord
    // This assignment provides the user object *and* the ID.
    dbLandlord.user = dbUser;

    return dbLandlord;
  }
}