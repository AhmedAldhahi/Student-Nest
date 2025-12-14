import { createContext, useContext, useState } from "react";

type GenericData = {
  fullName: string;
  email: string;
  birthDate: string;
  phoneNumber: string;
  password: string;
  role: "student" | "landlord";
};

type StudentData = {
  major: string;
  graduationYear: string;
  universityName: string;
  studentCardId: string;
  walletAddress: string;
  studentGovId: string;
  verificationFile: any;
};

type landlordData = {
  cliqAccount: string;
  landlordGovId: string;
};

type RegistrationContextType = {
  genericData: GenericData | null;
  studentData: StudentData | null;
  landlordData: landlordData | null;
  setGenericData: (data: GenericData) => void;
  setStudentData: (data: StudentData) => void;
  setLandlordData: (data: landlordData) => void;
};

const RegistrationContext = createContext<RegistrationContextType | undefined>(
  undefined
);

export const RegistrationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [genericData, setGenericData] = useState<GenericData | null>(null);
  const [studentData, setStudentData] = useState<StudentData | null>(null);
  const [landlordData, setLandlordData] = useState<landlordData | null>(null);

  return (
    <RegistrationContext.Provider
      value={{ genericData, studentData, landlordData, setGenericData, setStudentData, setLandlordData }}
    >
      {children}
    </RegistrationContext.Provider>
  );
};

export const useRegistration = () => {
  const context = useContext(RegistrationContext);
  if (!context)
    throw new Error("useRegistration must be used within RegistrationProvider");
  return context;
};
