import CaseStudy from "./CaseStudy";
import CaseStudyProvider from "./context/CaseStudyProvider";

export default function CaseStudyIndex() {
    return (
        <CaseStudyProvider>
            <CaseStudy />
        </CaseStudyProvider>
    );
}
