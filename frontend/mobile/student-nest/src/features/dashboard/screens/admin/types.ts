
export interface LandlordUser {
    userId: string;
    name: string;
    dateOfBirth: string;
    email: string;
    role: string;
    phoneNumber: string;
    address: string;
    photo: string | null;
    createdAt: string;
    emailVerfied: boolean;
}

export interface Landlord {
    user: LandlordUser;
    cliQAccount: string;
    landlordGovId: string;
    document: string;
    verifiedLandlord: boolean;
}

export interface StudentUser {
    userId: string;
    name: string;
    dateOfBirth: string;
    email: string;
    role: string;
    phoneNumber: string;
    address: string;
    photo: string | null;
    createdAt: string;
    emailVerfied: boolean;
}

export interface Student {
    user: StudentUser;
    GraduationYear: number;
    Major: string;
    studentCardID: string;
    userGovId: string;
    universityName: string;
    studentValidateDocument: string;
}

export interface Lease {
    leaseId: number;
    LeaseActivationStatus: boolean;
    isLandlordSigned: boolean;
    isStudentSigned: boolean;
    houseRule: string;
    leaseStartDate: string;
    leaseEndDate: string;
    monthlyRent: string; // JSON shows "350" as string
    leaseTerm: string;   // JSON shows "1 Year" as string
    includeUtilities: string;
    createAt: string;
    studentName: string;
    landlordName: string;
    apartmentTitle: string;
}
