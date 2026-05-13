import type { OnboardLayoutProps } from "./onboard.types";

export default function OnboardLayout({ children, title }: OnboardLayoutProps) {
    return (
        <>
            <div className="h-[100px] py-2 bg-white flex justify-center">
                <img src="/logo.png" alt="logo" className="w-[100px] h-full" />
            </div>
            <div className="h-[calc(100vh-120px)] min-h-96 bg-cover bg-no-repeat flex justify-center items-center">
                <div className="bg-white rounded-[10px] drop-shadow-[0_0_4px_rgba(0,0,0,0.25)] px-6 py-6 sm:w-[363px]">
                    <div className="uppercase rounded-[10px] h-12 text-lg font-semibold flex items-center justify-center" style={{ color: "var(--primary-color)" }}>{title}</div>
                    {children}
                </div>
            </div>
        </>
    )
}
