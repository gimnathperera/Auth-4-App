import * as Yup from 'yup';

export const userLoginSchema = Yup.object({
  email: Yup.string()
    .email('Must be a valid email*')
    .max(255)
    .required('Email is required*'),
  password: Yup.string().max(255).required('Password is required*'),
});

export const userRegisterationSchema = Yup.object({
  username: Yup.string().max(255).required('Username is required*'),
  fullName: Yup.string().max(255).required('Full Name is required*'),
  fullName: Yup.string().max(255).required('Full Name is required*'),
  email: Yup.string()
    .email('Must be a valid email*')
    .max(255)
    .required('Email is required*'),
  mobileNumber: Yup.string().max(255).required('Mobile Number is required*'),
  password: Yup.string().max(255).required('Password is required*'),
  confirmPassword: Yup.string()
    .max(255)
    .required('ConfirmPassword is required*')
    .oneOf([Yup.ref('password'), null], 'Passwords must match*'),
});
