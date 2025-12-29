import { ILeaseStrategy } from "./ILease.strategy";

export class LandlordLeaseStrategy implements ILeaseStrategy {
    constructor(){}

    public async FindAllLeases(userId: string): Promise<any> {
        throw new Error("Method not implemented.");
    }
    
    public async SearchForLeases(query: string, userId: string): Promise<any> {
        throw new Error("Method not implemented.");
    }
}