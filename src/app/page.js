import HomePage from "./Home/HomePage";
import { getCountryCookie} from '../lib/auth-cookies';
import Loader from "@/components/Loader/Loader";
import Head from "next/head";
export default async function Home({}) {
  
  const countryIdFromCookie = getCountryCookie();
  let homePageDataResp = {}
  console.log("countryIdFromCookiecountryIdFromCookie",countryIdFromCookie)
  if(8){
    // if(countryIdFromCookie){
     const homePageData  =  await fetch(`${process.env.BACKEND_END_POINT_URL}/module/home-page`, {
      method: 'GET',
      headers:{
      'Content-Type': 'application/json',
      'country' : 8
    },
    cache: 'no-store' 
    })
     homePageDataResp = await homePageData.json();
  // }
    }
 


  return (
    <>
      <script type="text/javascript" src="/spin-wheel.js" async></script>
      <script type="text/javascript" src="/fresh-chat.js" async></script>
      {(homePageDataResp && Object.keys(homePageDataResp).length> 0)?<HomePage homePageData={homePageDataResp}/>: <Loader  isShow={true}/>}
    </>

  )
}
