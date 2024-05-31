import PageHeader from '@/app/[lng]/components/PageHeader/PageHeader';
import CancelRequest from './CancelRequest/CancelRequest';
import { authHeader } from "../../../../../../lib/auth-cookies";

export default async function CancellationRequest({}) {

  const customHeader = await authHeader();
  const cancelReasonResp =  await fetch(`${process.env.BACKEND_END_POINT_URL}/module/cancel-reason`, {
    method: 'GET',
    cache: 'no-store'
  })
  const cancelReasonData = await cancelReasonResp.json();

  console.log("cancelReasonDatacancelReasonData",cancelReasonData)

  return (
    <>
      <PageHeader headerName="Cancellation Request" />
      <CancelRequest cancelReasonData={cancelReasonData}/>
 
    </>

  )
}
