
import PageHeader from "@/app/[lng]/components/PageHeader/PageHeader";
import EditAddress from './EditAddress/EditAddress';
import { cookies } from "next/headers";


export default function EditAddressPage({request}) {

  const nextCookies = cookies();
  const language_code = nextCookies.get('language_code')?.value


  
      return (
        <>
          <PageHeader headerName={language_code == "ar" ?  "تعديل العنوان" :  "Edit Address"} />
          <EditAddress />
        </>
      )
    }
    