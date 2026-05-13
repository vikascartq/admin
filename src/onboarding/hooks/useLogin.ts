import { loginSchema } from "@/schema/auth.schema";
import { adminLogin } from "@/services/auth.service";
import { addToast } from "@heroui/react";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router";
import type { loginI } from "../onboard.types";

const initialValues: loginI = {
    email: "",
    password: "",
}

export default function useLogin() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues,
        validationSchema: loginSchema,
        onSubmit: handleLogin
    });

    async function handleLogin(val: loginI) {
        try {
            setIsLoading(true);
            const resp = await adminLogin(val);
            addToast({
                title: resp?.data.message || "OTP sent to mail!",
                color: "success"
            });
            setTimeout(() => {
                sessionStorage.setItem("aid", val.email);
                setIsLoading(false);
                navigate("/otp");
            }, 2000);
        } catch (error) {
            setIsLoading(false);
            throw error;
        }
    }

    return {
        formik,
        isLoading
    }
}
