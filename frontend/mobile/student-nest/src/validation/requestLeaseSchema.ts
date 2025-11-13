// validation/requestLeaseSchema.ts
import * as yup from "yup";

export const requestLeaseSchema = yup.object().shape({
  studentName: yup.string().required("Student name is required"),
  landlordName: yup.string().required("Landlord name is required"),
  message: yup.string().required("Message is required"),
  startDate: yup.string().required("Start date is required"),
  rentTerm: yup.number().required("Rent term is required"),
});
