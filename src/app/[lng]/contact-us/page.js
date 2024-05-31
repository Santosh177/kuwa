import PageHeader from "@/app/[lng]/components/PageHeader/PageHeader";
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