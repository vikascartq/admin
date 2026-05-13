import React from "react";
import { Input } from "@heroui/react";
import CloseEyeIcon from "@/svg/CloseEyeIcon";
import OpenEyeIcon from "@/svg/OpenEyeIcon";

type PasswordFieldProps = React.ComponentProps<typeof Input>;

const PasswordField: React.FC<PasswordFieldProps> = (props) => {
    const [isVisible, setIsVisible] = React.useState(false);

    const toggleVisibility = () => setIsVisible((prev) => !prev);

    return (
        <Input
            {...props}
            type={isVisible ? "text" : "password"}
            endContent={
                <button
                    aria-label="toggle password visibility"
                    className="focus:outline-none outline-transparent cursor-pointer"
                    type="button"
                    onClick={toggleVisibility}
                >
                    {isVisible ? (
                        <OpenEyeIcon />
                    ) : (
                        <CloseEyeIcon />
                    )}
                </button>
            }
        />
    );
};

export default PasswordField;
