export type LeaseRequest = {
  request_id: number;
  student_id: number;
  apartment_id: number;
  request_message?: string;
  rent_term: string;
  status: "pending" | "accept" | "reject";
  started_date: string;
  created_at: string;
};
