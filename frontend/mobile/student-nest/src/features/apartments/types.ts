export type ApartmentPhoto = {
  photoId: string;
  photoUrl: string;
};

export type ApartmentDocument = {
  apartmentDocumentId: string;
  documentUrl: string;
  apartmentType: string;
  apartmentsId: string;
};

export type GoogleMapLocation = {
  googleMapLocationId: string;
  longitude: string;
  latitude: string;
};

export type Apartment = {
  apartmentId: string;
  isVisible: boolean;
  title: string;
  description: string;
  address: string;
  isVerified: boolean;
  isJoin: boolean;
  numberOfBed: string;
  numberOfRoom: string;
  price: string;
  landlordName: string;
  apartmentPhoto: ApartmentPhoto[];
  apartmentDocuments: ApartmentDocument | null;
  googleMapLocation: GoogleMapLocation | null;
};

export interface AddApartmentFormValues {
  title: string;
  description: string;
  price: number;   // 👈 number in form state
  address: string;
  rooms: number;   // 👈 number in form state
  beds: number;    // 👈 number in form state
  joinedRoom: boolean; // stays boolean
  isVisible: boolean; // 👈 new field
  googleMapLocationLat: number; // 👈 new field
  googleMapLocationLong: number; // 👈 new field
  images: string[]
}

export interface AddApartmentPayload {
  landlordName: string;
  title: string;
  description: string;
  price: string;   // 👈 API expects string
  address: string;
  rooms: string;   // 👈 API expects string
  beds: string;    // 👈 API expects string
  joinedRoom: boolean; // stays boolean
  images: string[]
}