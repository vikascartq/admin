import { object, string } from "yup";

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+[\]{}\\|;:'",<.>/?~`])[A-Za-z\d!@#$%^&*()\-_=+[\]{}\\|;:'",<.>/?~`]{8,}$/;

export const loginSchema = object({
    email: string().email().required("email is required"),
    password: string().matches(passwordRegex, "must be 8 letters including uppercase, lowercase, number and special character")
        .required(),
})

export const otpSchema = object({
    otp: string().matches(/^\d+$/, "Invalid OTP")
})
