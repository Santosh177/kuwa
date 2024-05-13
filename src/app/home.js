
'use client'
import HomePage from "./Home/HomePage";
import Loader from "@/components/Loader/Loader";
import { useEffect, useState } from "react";
import { useCountry } from '@/context/contryDetails';

export default function Home(req) {

  console.log("HomePage",req)

  const [homePageData, setHomePageData] = useState({});
  const { selectedCountry={} }=useCountry()||{};
  const ipaddress = homePageData.ipAddress || ""
  console.log("ipaddress",ipaddress)
  useEffect(()=>{
      getHomePageLayout()
  },[])

  const getHomePageLayout = async() =>{
       const homePageData  =  await fetch(`/api/get-home-page-data`, {
        method: 'GET',
        headers:{
        'Content-Type': 'application/json',
        'country' : selectedCountry.id
      },
      cache: 'no-store' 
      })
      const homePageDataResp = await homePageData.json();
      setHomePageData(homePageDataResp)
  }
  

  console.log("homePageData",homePageData)


  return (
    <>
      <script type="text/javascript" src="/spin-wheel.js" async></script>
      <script type="text/javascript" src="/fresh-chat.js" async></script>
      {process.env.NODE_ENV === 'production' && <script type="text/javascript" src="/clarity-setup.js" async></script>}
      {(homePageData && Object.keys(homePageData).length> 0)?<HomePage homePageData={homePageData}/>: <Loader  isShow={true}/>}
    </>

  )
}