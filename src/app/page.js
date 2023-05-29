import HomePage from "./Home/HomePage";
import { authHeader } from '../lib/auth-cookies';

export default async function Home({}) {


  const customHeader = await authHeader();
  const homePageData  =  await fetch('https://api.kuwa.bevaleo.dev/module/home-page?country=1', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    next: { revalidate: 0} 
  })
  const homePageDataResp = await homePageData.json();





  // const {kuwaUsps=[],data=[],brandUMustTry=[] } = homePageDataResp || {};


  return (
    <>
      <HomePage homePageData={homePageDataResp}/>
    </>

  )
}
