import * as Yup from "yup";
import { isValidLatinInput } from "../helpers/contacts";

export const addPetSchema = Yup.object({
  name: Yup.string()
    .required('Name is required')
    .test('is-latin', 'A name can only contain Latin characters', value => {
      if (!value) return true; 
      return isValidLatinInput.test(value);
    })
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name cannot exceed 50 characters"),

birthday: Yup.string()
  .required('Date of birth is required')
  .test('is-valid-date', 'Incorrect date', value => {
    if (!value) return false; 
    const date = new Date(value);
    return !isNaN(date.getTime());
  })
  .test('is-not-in-future', 'The date cannot be in the future', value => {
    if (!value) return false;
    const date = new Date(value);
    const now = new Date();
    return date <= now; 
  }),

title: Yup.string()
    .required('Text is required')
    .min(2, "Name must be at least 2 characters")
    .max(15, "Name cannot exceed 50 characters"),

species: Yup.string()
    .required('Species is required')
  .oneOf(
    [
      "Dog",
      "Cat",
      "Monkey",
      "Bird",
      "Snake",
      "Turtle",
      "Lizard",
      "Frog",
      "Fish",
      "Ants",
      "Bees",
      "Butterfly"
    ],
    'Selected types'
  ),

sex: Yup.string()
  .required('Gender is required')
  .oneOf(
    [
    "male",
    "female",
    "health"
    ],
    "Select gender"
  ),

  uploadPhoto: Yup
    .mixed()
    .test("fileSize", "The file is too large", (value) => {
      if (!value) return true;
      return (value as File).size <= 5 * 1024 * 1024; 
    })
    .test("fileType", "Invalid file format", (value) => {
      if (!value) return true;
      return ["image/jpeg", "image/png", "image/jpg"].includes((value as File).type);
    }),

  photoUrl: Yup.string().url("Invalid file format").nullable(),

}).test("fileOrUrl", "Upload a file or provide a URL", function (value) {
  const { uploadPhoto, photoUrl } = value as { uploadPhoto?: File; photoUrl?: string };

  if (!uploadPhoto && (!photoUrl || photoUrl.trim() === "")) {
    return this.createError({ message: "Upload a file or provide a URL" });
  }
  return true;
});
