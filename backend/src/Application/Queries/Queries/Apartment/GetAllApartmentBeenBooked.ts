import { IQueries } from "../../IQueries";

export class GetAllApartmentBeenBookedQueries implements IQueries {
    public userId:string;
    constructor(userId:string){
        this.userId = userId;
    }

}