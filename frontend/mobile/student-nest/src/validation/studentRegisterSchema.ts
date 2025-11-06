import * as yup from "yup";

export const studentRegisterSchema = yup.object().shape({
  major: yup.string().trim().required("Major is required"),
  graduationYear: yup
    .string()
    .trim()
    .matches(/^\d{4}$/, "Graduation year must be a 4-digit number")
    .required("Graduation year is required"),
  universityName: yup.string().trim().required("University Name is required"),
  studentCardId: yup
    .string()
    .trim()
    .matches(/^\d+$/, "Student Card ID must contain only numbers")
    .required("Student Card ID is required"),
  walletAddress: yup.string().trim(),
  studentGovId: yup
    .string()
    .trim()
    .matches(/^\d+$/, "Student Government ID must contain only numbers")
    .required("Student Government ID is required"),
});
