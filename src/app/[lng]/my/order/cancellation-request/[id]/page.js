import PageHeader from '@/app/[lng]/components/PageHeader/PageHeader';
import CancelRequest from './CancelRequest/CancelRequest';
import { authHeader } from "../../../../../../lib/auth-cookies";
import { cookies } from 'next/headers';

export default async function CancellationRequest({}) {
  const nextCookies = cookies();

  const language_code = nextCookies.get('language_code')?.value

  const customHeader = await authHeader();
  const cancelReasonResp =  await fetch(`${process.env.BACKEND_END_POINT_URL}/module/cancel-reason`, {
    method: 'GET',
    cache: 'no-store'
  })
  const cancelReasonData = await cancelReasonResp.json();

  console.log("cancelReasonDatacancelReasonData",cancelReasonData)

  return (
    <>
      <PageHeader headerName={language_code == "ar" ? "طلب الإلغاء"  : "Cancellation Request"} />
      <CancelRequest cancelReasonData={cancelReasonData}/>
 
    </>

  )
}
