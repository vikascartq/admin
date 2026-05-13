import { otpSchema } from "@/schema/auth.schema";
import { verifyEmailOtp } from "@/services/auth.service";
import { addToast } from "@heroui/react";
import { useFormik } from "formik";
import { useState } from "react";
import type { OtpI } from "../onboard.types";

const initialValues: OtpI = {
    otp: "",
    email: ""
}


export default function useOtp() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    // const [otpType, setOtpType] = useState<"email" | "2fa">("email");

    const formik = useFormik({
        initialValues,
        validationSchema: otpSchema,
        onSubmit: handleOTP
    })

    async function handleOTP(val: OtpI) {
        try {
            setIsLoading(true);
            const email = sessionStorage.getItem("aid") || "";
            const payload = { email, otp: val.otp }
            const resp = await verifyEmailOtp(payload);
            addToast({
                title: resp?.data.message || "email otp verified",
                color: "success"
            });
            setTimeout(() => {
                sessionStorage.removeItem("aid");
                sessionStorage.setItem("aid", resp?.data?.adminId);
                setIsLoading(false);
                formik.resetForm();
                // setOtpType("2fa");
                window.location.href = "/jobs";
            }, 2000);
            // if (otpType === "email") {
            // } else {
            //     const adminId = sessionStorage.getItem("aid") || "";
            //     const payload = { adminId, token: val.otp }
            //     const resp = await verify2FAOtp(payload);
            //     addToast({
            //         title: resp?.data.message || "admin login",
            //         color: "success"
            //     });
            //     setTimeout(() => {
            //         sessionStorage.removeItem("aid");
            //         setIsLoading(false);
            //         formik.resetForm();
            //         // window.location.href = "/category";
            //     }, 2000);
            // }
        } catch (error) {
            setIsLoading(false);
            throw error;
        }
    }

    return {
        formik,
        isLoading,
        // otpType
    }
}
