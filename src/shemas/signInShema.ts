import * as Yup from "yup";

import { emailRegex, passwordRegex } from '../helpers/contacts';

export const signUpSchema = Yup.object().shape({
    email: Yup.string()
        .matches(emailRegex, "Invalid email format")
        .required("Required"),
    password: Yup.string()
        .matches(passwordRegex, "Password must be at least 6 characters long, include one uppercase letter, one number, and one special character")
        .required("Required"),
});