import { currentYear } from "../../Shared/constants/validationZod.constant";

export class studentGraduateYear {
    constructor(private value: number) { 
        if (!value) throw new Error ("student Graduated year is required");
        if (value < currentYear) throw new Error ("invalid graduate year !!");

    }

    public getValue() : number {
        return this.value;
    }
}


