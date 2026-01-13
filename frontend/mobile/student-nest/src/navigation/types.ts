import { Apartment } from "../features/apartments/types";
import { Landlord, Student } from "../features/dashboard/screens/admin/types";

export type RootStackParamList = {
  SignInScreen: undefined;
  GenericRegisterScreen: undefined;
  StudentRegisterScreen: undefined;
  LandlordRegisterScreen: undefined;
  OTPScreen: undefined;
  ForgotPasswordScreen: undefined;
  VerifyRecoveryOtpScreen: { email: string };
  ResetPasswordScreen: { email: string };
  Main: undefined; // 👈 This wraps BottomTabs

  AdminDashboardScreen: undefined;
  AuditLogScreen: undefined;
  StudentsScreen: undefined;
  LandlordsScreen: undefined;
  LandlordDetailScreen: { landlord: Landlord };
  StudentDetailScreen: { student: Student };
  AdminApartmentsScreen: { landlordId?: string };
  AdminRequestsScreen: { landlordId?: string };
  VerificationScreen: { landlordId?: string };
  AdminLeaseScreen: { landlordId?: string };

  StudentDashboardScreen: undefined;
  LandlordDashboardScreen: undefined;
  NotificationScreen: undefined;

  StudentRequestsScreen: { studentId: string };
  StudentLeaseScreen: { studentId: string };


  LandlordRequestsScreen: { landlordId: string };
  LandlordLeaseScreen: { landlordId: string };

  AdminApartments: { landlordId?: string } | undefined;
  AdminApartmentDetail: { apartment: any }; // Using any for simplicity now, but should ideally be AdminApartment
  LeaseScreen: { landlordId?: string; studentId?: string } | undefined;
  ProfileScreen: undefined;
  RequestsScreen: undefined;
  SettingsScreen: undefined;
  ApartmentScreen: undefined;

  ApartmentDetailsScreen: { apartment: Apartment }; // ✅ expects an apartment object
  RequestLeaseForm: { apartment: Apartment }; // ✅ pass apartment into RequestLeaseForm
  TestRoleSwitcher: undefined; // 👈 add this for quick role switching
  ApartmentRequestsScreen: { apartmentId: string };
  MyApartmentsScreen: { filter?: "all" | "booked" } | undefined;
  AddApartmentForm: undefined;
  EditApartmentScreen: { apartment: Apartment };
  ApartmentLeasesScreen: { apartmentId: string };
  LeasePaymentsScreen: { leaseId: string; apartmentId?: string };
};
