import { Apartment } from "../features/apartments/types";

export type RootStackParamList = {
  SignInScreen: undefined;
  GenericRegisterScreen: undefined;
  StudentRegisterScreen: undefined;
  LandlordRegisterScreen: undefined;
  OTPScreen: undefined;
  DashboardScreen: undefined;
  ApartmentScreen: undefined;
  ApartmentDetailsScreen: { apartment: Apartment }; // ✅ expects an apartment object
};
