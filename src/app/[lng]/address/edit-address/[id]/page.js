
import PageHeader from "@/app/[lng]/components/PageHeader/PageHeader";
import EditAddress from './EditAddress/EditAddress';


export default function EditAddressPage({request}) {



  
      return (
        <>
          <PageHeader headerName="Edit Address" />
          <EditAddress />
        </>
      )
    }
    