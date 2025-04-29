import * as Yup from "yup";
import { emailRegex, 
         isValidLatinInput, 
         isValidPhoneNumber 
        } from "../helpers/contacts";


export const editInformationSchema = Yup.object().shape({
    name: Yup.string()
        .matches(isValidLatinInput, "A comment can only contain Latin characters")
        .min(2, 'Name must be at least 2 characters')
        .max(50, 'Name cannot exceed 50 characters')
        .required("Required"),
    email: Yup.string()
        .matches(emailRegex, "Invalid email format")
        .required("Required"),
    phone: Yup.string()
        .matches(isValidPhoneNumber,"Invalid phone number")
        .required("Required"),
});