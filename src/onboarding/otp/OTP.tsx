import { Button, Input } from "@heroui/react";
import OnboardLayout from "../OnboardLayout";
import useOtp from "../hooks/useOtp";

export default function OTP() {
    const { formik, isLoading } = useOtp();
    return (
        <>
            <OnboardLayout title={"Verify Email OTP"}>
                <form onSubmit={formik.handleSubmit}>
                    <Input
                        aria-label="OTP"
                        placeholder={"Enter Email OTP"}
                        type="text"
                        classNames={{
                            base: "input-field-base",
                            inputWrapper: "input-field-wrapper data-[invalid=true]:!bg-white group-data-[focus=true]:!bg-white !bg-white data-[hover=true]:!bg-white",
                            input: "input-field !text-black"
                        }}
                        {...formik.getFieldProps("otp")}
                        isInvalid={!!formik.errors.otp && formik.touched.otp}
                        errorMessage={formik.touched.otp && formik.errors.otp}
                        maxLength={6}
                        pattern="\d{6}"
                    />
                    <Button
                        type="submit"
                        isDisabled={isLoading}
                        className="primary-btn my-4 w-full"
                    >Submit</Button>
                </form>
            </OnboardLayout>
        </>
    )
}
