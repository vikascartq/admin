import { checkAuthUser } from "@/services/auth.service";
import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
// import { ToastContainer } from "react-toastify";



export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isAuthenticated, setAuthenticated] = useState<boolean>(false);
    const [loading, setLoading] = useState(true);

    async function verify() {
        try {
            const resp = await checkAuthUser();
            if (resp.data?.status) {
                setAuthenticated(true);
                setLoading(false);
            } else {
                setAuthenticated(false);
                setLoading(false);
            }
        } catch (error) {
            const er = error as { response: { data: { status: boolean } } }
            const status = er?.response?.data?.status;
            if (status === false) {
                setAuthenticated(false);
                setLoading(false);
            }
        }
    }

    useEffect(() => {
        (async () => {
            await verify();
        })();
    }, [])

    return (
        <AuthContext.Provider value={{ isAuthenticated, setAuthenticated, loading }}>
            {children}
            {/* <ToastContainer stacked /> */}
        </AuthContext.Provider>
    )
}
