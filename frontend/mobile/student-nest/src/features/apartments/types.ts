export type Apartment = {
  apartmentId: string;
  landlordId: number;   
  propertyStatus: "available" | "rented" | "pending";
  title: string;
  description: string;
  price: string;
  address: string;
  rooms: number;
  beds: number;
  images: (string | number)[];
  verified: boolean;
  apartmentDocumentId?: number | null; // 👈 use this to infer pending
};

export interface AddApartmentFormValues {
  title: string;
  description: string;
  price: number;   // 👈 number in form state
  address: string;
  rooms: number;   // 👈 number in form state
  beds: number;    // 👈 number in form state
  joinedRoom: boolean; // stays boolean
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