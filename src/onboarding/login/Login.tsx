import PasswordField from "@/ui/PasswordField";
import { Button, Input } from "@heroui/react";
import OnboardLayout from "../OnboardLayout";
import useLogin from "../hooks/useLogin";

export default function Login() {
    const { formik, isLoading } = useLogin();
    return (
        <>
            <OnboardLayout title="Admin Login">
                <form onSubmit={formik.handleSubmit}>
                    <Input
                        aria-label="Email"
                        placeholder="Email"
                        type="email"
                        classNames={{
                            base: "input-field-base",
                            inputWrapper: "input-field-wrapper data-[invalid=true]:!bg-white group-data-[focus=true]:!bg-white !bg-white data-[hover=true]:!bg-white",
                            input: "input-field !text-black"
                        }}
                        {...formik.getFieldProps("email")}
                        isInvalid={!!formik.errors.email && formik.touched.email}
                        errorMessage={formik.touched.email && formik.errors.email}
                    />
                    <PasswordField
                        aria-label="Password"
                        placeholder="Password"
                        classNames={{
                            base: "input-field-base",
                            inputWrapper: "input-field-wrapper data-[invalid=true]:!bg-white group-data-[focus=true]:!bg-white !bg-white data-[hover=true]:!bg-white",
                            input: "input-field !text-black"
                        }}
                        {...formik.getFieldProps("password")}
                        isInvalid={!!formik.errors.password && formik.touched.password}
                        errorMessage={formik.touched.password && formik.errors.password}
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
