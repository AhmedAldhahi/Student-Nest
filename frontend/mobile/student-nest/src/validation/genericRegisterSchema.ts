import * as yup from "yup";

export const genericRegisterSchema = yup.object().shape({
  fullName: yup.string().required("Full name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  birthDate: yup.string().required("Birth date is required"),
  phoneNumber: yup.string().max(15, "Phone Number must be less than 15 numbers").required("Phone number is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm your password"),
});
