
export const emailRegex =  /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;

export const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/;

export const isValidLatinInput = /^[a-zA-Z]+$/;

export const isValidPhoneNumber = /^\+?[1-9]\d{1,14}$/;


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