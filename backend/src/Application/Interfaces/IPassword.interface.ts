export interface IPasswordService {
    hash(password: string) : Promise<string>; // hash need the legth
    compare(password: string, hash: string) : Promise<Boolean>;
} 

