import PageHeader from "@/components/PageHeader/PageHeader";
import GetBackForm from "./components/getBackForm";
import StoreInformation from "./components/storeInformation";

export default function ContactUs() {
    return (
        <div>
            <PageHeader headerName="Contact Us" />
            {/* <GetBackForm/> */}
            <StoreInformation/>
        </div>
    )
}