
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

export interface LeaseRequest {
    requestLeaseId: number;
    requestMessage: string;
    startDate: string;
    rentTerm: string;
    requestStatus: "Pending" | "Accept" | "Reject";
    createAt: string;
    studentName: string;
    landlordName: string;
    apartmentTitle: string;
    apartmentPrice: string;
    Major: string;
}

export interface AdminApartment {
    apartmentId: number;
    propertyStatus: boolean;
    title: string;
    description: string;
    address: string;
    Verified: boolean;
    isFully: boolean;
    isJoin: boolean;
    numberOfBed: string;
    numberOfRoom: string;
    price: string;
    landlordName: string;
    apartmentPhoto: string[];
}

export interface AuditLog {
    logId: string;
    actionType: string;
    actionTimestamp: string;
    description: string;
    deviceInfo: string;
    fieldName: Record<string, boolean> | null;
    ipAddress: string;
    location: string;
    newValue: string | null;
    oldValue: string | null;
    record: string;
    targetUserId: string;
    targetUserName: string;
    targetUserRole: string;
    performedByUserId: string | null;
    performedByUserName: string | null;
    performedByUserRole: string | null;
}
