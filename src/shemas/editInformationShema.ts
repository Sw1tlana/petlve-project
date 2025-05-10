import * as Yup from "yup";
import { emailRegex, isValidLatinInput, isValidPhoneNumber } from "../helpers/contacts";

export const editInformationSchema = Yup.object({
  name: Yup.string()
    .matches(isValidLatinInput, "A name can only contain Latin characters")
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name cannot exceed 50 characters")
    .optional()
    .nullable(),

  email: Yup.string()
    .matches(emailRegex, "Invalid email format")
    .optional()
    .nullable(),

  phone: Yup.string()
    .matches(isValidPhoneNumber, "Invalid phone number")
    .optional()
    .nullable(),

  photoUrl: Yup.string()
    .url("Invalid URL format") 
    .optional()
    .nullable(),

  uploadPhoto: Yup.mixed<File>()
    .nullable()
    .notRequired()
    .test("fileSize", "File is too large", (value) => {
      return !value || value.size <= 5 * 1024 * 1024; 
    }),
});