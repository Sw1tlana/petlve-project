
export const emailRegex =  /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;

export const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/;

export const isValidLatinInput = /^[a-zA-Z]+$/;

export const isValidPhoneNumber = /^(\+?[0-9]{1,3})?([0-9]{10})$/;

export const formValuesSignUp = {
    name: '',
    email: '',
    password: '',
    phone: '',
};

export const formValuesSignIn = {
    email: '',
    password: '',
};

export const formValuesEditInform = {
    name: '',
    email: '',
    phone: '',
    uploadPhoto: '',
    photoUrl: '',
};