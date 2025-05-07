import * as Yup from "yup";
import { emailRegex, isValidLatinInput, isValidPhoneNumber } from "../helpers/contacts";

export const editInformationSchema = Yup.object({
  name: Yup.string()
    .matches(isValidLatinInput, "A name can only contain Latin characters")
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name cannot exceed 50 characters")
    .optional()
    .notRequired(),

  email: Yup.string()
    .matches(emailRegex, "Invalid email format")
    .optional()
    .notRequired(),

  phone: Yup.string()
    .matches(isValidPhoneNumber, "Invalid phone number")
    .optional()
    .notRequired(),

  photoUrl: Yup.string()
    .url("Invalid URL format")
    .optional()
    .notRequired(),

  uploadPhoto: Yup.mixed<File>()
    .nullable()
    .notRequired()
    .notRequired()
    .test("fileSize", "File is too large", (value) => {
      return !value || value.size <= 5 * 1024 * 1024;
    }),
});