import * as yup from "yup";

export const landlordRegisterSchema = yup.object().shape({
  cliqAccount: yup.string().trim().required("CliQ Account is required"),
  landlordGovId: yup
    .string()
    .trim()
    .required("Landlord Government ID is required")
    .matches(/^\d+$/, "Student Government ID must contain only numbers"),
});
