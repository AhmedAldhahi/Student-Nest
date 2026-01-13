// src/validation/addApartmentSchema.ts
import * as yup from "yup";

export const addApartmentSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  price: yup
    .number()
    .transform((value, originalValue) => {
      return originalValue === "" ? undefined : Number(originalValue);
    })
    .typeError("Price must be a number")
    .positive("Price must be positive")
    .required("Price is required"),
  address: yup.string().required("Address is required"),
  rooms: yup
    .number()
    .transform((value, originalValue) => {
      return originalValue === "" ? undefined : Number(originalValue);
    })
    .typeError("Rooms must be a number")
    .min(1, "At least 1 room")
    .required("Rooms are required"),
  beds: yup
    .number()
    .transform((value, originalValue) => {
      return originalValue === "" ? undefined : Number(originalValue);
    })
    .typeError("Beds must be a number")
    .min(1, "At least 1 bed")
    .required("Beds are required"),
  joinedRoom: yup.boolean().required("Please specify if joined room"),
  isVisible: yup.boolean().default(true),
  googleMapLocationLat: yup.number()
    .transform((value, originalValue) => originalValue === "" ? undefined : Number(originalValue))
    .required("Latitude is required")
    .typeError("Latitude must be a number"),
  googleMapLocationLong: yup.number()
    .transform((value, originalValue) => originalValue === "" ? undefined : Number(originalValue))
    .required("Longitude is required")
    .typeError("Longitude must be a number"),
  images: yup
    .array()
    .of(yup.string().required())
    .min(1, "At least one picture is required")
    .max(6, "You can upload up to 6 pictures")
    .required("Images are required")
    .defined(), // 👈 fix
});
