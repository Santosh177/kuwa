import HomePage from "./Home/HomePage";
import { getCountryCookie} from '../lib/auth-cookies';
export default async function Home({}) {
  
  const countryIdFromCookie = getCountryCookie();
  const homePageData  =  await fetch(`https://api.kuwa.bevaleo.dev/module/home-page`, {
    method: 'GET',
    headers:{
    'Content-Type': 'application/json',
    'country' : parseInt(countryIdFromCookie)
  },
  cache: 'no-store' 
  })
 
  const homePageDataResp = await homePageData.json();
 console.log("homePageData", homePageDataResp);


  return (
    <>
   
      <HomePage homePageData={homePageDataResp}/>
    </>

  )
}
