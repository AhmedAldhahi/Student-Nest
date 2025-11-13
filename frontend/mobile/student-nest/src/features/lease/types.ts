// types/lease.ts
export type RentTermOption = '3_months' | '6_months' | '12_months' | '24_months' | 'custom';

export interface ApartmentSummary {
  id: string;
  name: string;
  address: string;
  monthlyRent: number;
  currency: string; // e.g., "USD", "JOD"
  landlordId: string;
}
export interface RequestLeasePayload {
  apartmentId: string;
  studentName: string;   // ✅ added
  landlordName: string;  // ✅ added
  message: string;
  startDate: string;     // ISO8601
  rentTerm: number;
  endDate?: string;      // ISO8601, optional
}