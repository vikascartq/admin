import EnquiriesProvider from "./context/EnquiriesProvider";
import Enquiries from "./Enquiries";

export default function EnquiriesIndex() {
    return (
        <EnquiriesProvider>
            <Enquiries />
        </EnquiriesProvider>
    )
}
