export type Apartment = {
  apartmentId: string;
  propertyStatus: "available" | "rented" | "pending";
  title: string;
  description: string;
  price: string;
  address: string;
  rooms: number;
  beds: number;
  images: (string | number)[]; 
};