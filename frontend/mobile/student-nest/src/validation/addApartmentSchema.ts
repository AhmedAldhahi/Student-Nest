// src/validation/addApartmentSchema.ts
import * as yup from "yup";

export const addApartmentSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  price: yup
    .number()
    .typeError("Price must be a number")
    .positive("Price must be positive")
    .required("Price is required"),
  address: yup.string().required("Address is required"),
  rooms: yup
    .number()
    .typeError("Rooms must be a number")
    .min(1, "At least 1 room")
    .required("Rooms are required"),
  beds: yup
    .number()
    .typeError("Beds must be a number")
    .min(1, "At least 1 bed")
    .required("Beds are required"),
  joinedRoom: yup.boolean().required("Please specify if joined room"),
  images: yup
    .array()
    .of(yup.string().url("Each image must be a valid URI").required())
    .min(1, "At least one picture is required")
    .max(6, "You can upload up to 6 pictures")
    .required("Images are required")
    .defined(), // 👈 fix
});
