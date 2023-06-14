import PageHeader from '@/components/PageHeader/PageHeader';
import CancelRequest from './CancelRequest/CancelRequest';
import { authHeader } from "../../../../../lib/auth-cookies";

export default async function CancellationRequest({}) {

  const customHeader = await authHeader();
  const cancelReasonResp =  await fetch('https://api.kuwa.bevaleo.dev/module/cancel-reason', {
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
