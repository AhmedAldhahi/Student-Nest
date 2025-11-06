import * as yup from "yup";

export const genericRegisterSchema = yup.object().shape({
  fullName: yup.string().trim().required("Full name is required"),
  email: yup
    .string()
    .trim()
    .email("Invalid email")
    .required("Email is required"),
  birthDate: yup.string().trim().required("Birth date is required"),
  phoneNumber: yup
    .string()
    .trim()
    .required("Phone number is required")
    .max(15, "Phone Number must be less than 15 numbers"),
  password: yup
    .string()
    .trim()
    .required()
    .min(6, "Password must be at least 6 characters"),
  confirmPassword: yup
    .string()
    .trim()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm your password"),
});
