// import CategoryIndex from "@/dashboard/category/CategoryIndex";
import Layout from "@/dashboard/Layout";
// import ManageContentIndex from "@/dashboard/manage-content/ManageContentIndex";
// import PaymentRequestIndex from "@/dashboard/payment-request/PaymentRequestIndex";
// import SubCategoryIndex from "@/dashboard/sub-category/SubCategoryIndex";
import CandidateIndex from "@/dashboard/candidates/CandidateIndex";
import JobsIndex from "@/dashboard/jobs/JobsIndex";
import TestimonialIndex from "@/dashboard/testimonials/TestimonialIndex";
import Login from "@/onboarding/login/Login";
import OTP from "@/onboarding/otp/OTP";
import { BrowserRouter, Route, Routes } from "react-router";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";

export default function Index() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Public Routes */}
                <Route element={<PublicRoute />}>
                    <Route index element={<Login />} />
                    <Route path="/otp" element={<OTP />} />
                </Route>

                {/* Protected Routes */}
                <Route element={<ProtectedRoute />}>
                    <Route element={<Layout />} >
                        <Route path="/jobs" element={<JobsIndex />} />
                        <Route path="/candidate" element={<CandidateIndex />} />
                        <Route path="/testimonial" element={<TestimonialIndex />} />
                        {/* <Route path="/payment" element={<PaymentRequestIndex />} /> */}
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
