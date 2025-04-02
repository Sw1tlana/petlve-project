import * as Yup from "yup";

import { emailRegex, passwordRegex, isValidLatinInput, isValidPhoneNumber } from '../helpers/contacts';

export const signUpSchema = Yup.object().shape({
    name: Yup.string()
        .matches(isValidLatinInput, "A comment can only contain Latin characters")
        .required("Required"),
    email: Yup.string()
        .matches(emailRegex, "Invalid email format")
        .required("Required"),
    password: Yup.string()
        .matches(passwordRegex, "Password must be at least 6 characters long, include one uppercase letter, one number, and one special character")
        .required("Required"),
    phone: Yup.string()
        .matches(
          isValidPhoneNumber,
            "Invalid phone number")
        .required("Required"),
});
