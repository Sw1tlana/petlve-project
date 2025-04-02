
export const emailRegex =  /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;

export const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/;

export const isValidLatinInput = /^[a-zA-Z]+$/;

export const formValuesSignUp = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
};