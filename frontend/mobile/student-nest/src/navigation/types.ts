import { Apartment } from "../features/apartments/types";

export type RootStackParamList = {
  SignInScreen: undefined;
  GenericRegisterScreen: undefined;
  StudentRegisterScreen: undefined;
  LandlordRegisterScreen: undefined;
  OTPScreen: undefined;
  Main: undefined; // 👈 This wraps BottomTabs

  AdminDashboardScreen: undefined;
  AuditLogScreen: undefined;
  StudentsScreen: undefined;
  LandlordsScreen: undefined;
  LandlordDetailScreen: { landlordId: number };
  AdminApartmentsScreen: { landlordId?: number }; 

  StudentDashboardScreen: undefined;
  LandlordDashboardScreen: undefined;

  LeaseScreen: { landlordId?: number; studentId?: number } | undefined;
  ProfileScreen: undefined;
  RequestsScreen: undefined;
  SettingsScreen: undefined;
  ApartmentScreen: undefined;

  ApartmentDetailsScreen: { apartment: Apartment }; // ✅ expects an apartment object
  RequestLeaseForm: { apartment: Apartment }; // ✅ pass apartment into RequestLeaseForm
  TestRoleSwitcher: undefined; // 👈 add this for quick role switching
  MyApartmentsScreen: undefined;
  AddApartmentForm: undefined;
  EditApartmentScreen: { apartment: Apartment };
};
