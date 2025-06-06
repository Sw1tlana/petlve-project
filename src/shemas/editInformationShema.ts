import * as Yup from "yup";
import { 
        emailRegex, 
        isValidLatinInput, 
        isValidPhoneNumber 
  } from "../helpers/contacts";

export const editInformationSchema = Yup.object({
  name: Yup.string()
    .nullable()
    .notRequired()
    .test('is-latin', 'A name can only contain Latin characters', value => {
      if (!value) return true; 
      return isValidLatinInput.test(value);
    })
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name cannot exceed 50 characters"),

  email: Yup.string()
    .nullable()
    .notRequired()
    .test('is-email', 'Invalid email format', value => {
      if (!value) return true;
      return emailRegex.test(value);
    }),

  phone: Yup.string()
    .nullable()
    .notRequired()
    .test('is-phone', 'Invalid phone number', value => {
      if (!value) return true;
      return isValidPhoneNumber.test(value);
    }),

  photoUrl: Yup.string()
    .nullable()
    .notRequired()
    .test('is-url', 'Invalid URL format', value => {
      if (!value) return true;
      try {
        new URL(value);
        return true;
      } catch {
        return false;
      }
    }),

  uploadPhoto: Yup.mixed<File>()
    .nullable()
    .notRequired(),
  });