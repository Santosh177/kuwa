
'use client'
import HomePage from "../[lng]/Home/HomePage";
// import Loader from "@/app/[lng]/components/Loader/Loader";
import Loader from "./components/Loader/Loader";
import { useEffect, useState } from "react";
import { useCountry } from '@/context/contryDetails';

export default function Home() {


  const [homePageData, setHomePageData] = useState({});
  const { selectedCountry={} }=useCountry()||{};
  useEffect(()=>{
      getHomePageLayout()
  },[])

  const getHomePageLayout = async() =>{
       const homePageData  =  await fetch(`/api/get-home-page-data`, {
        method: 'GET',
        headers:{
        'Content-Type': 'application/json',
        'country' : selectedCountry.id,
        // 'Accept-Language': lng 
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