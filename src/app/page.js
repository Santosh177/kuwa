import HomePage from "./Home/HomePage";
import { getCountryCookie} from '../lib/auth-cookies';
export default async function Home({}) {
  
  const countryIdFromCookie = getCountryCookie();
  const homePageData  =  await fetch(`${process.env.BACKEND_END_POINT_URL}/module/home-page`, {
    method: 'GET',
    headers:{
    'Content-Type': 'application/json',
    'country' : parseInt(countryIdFromCookie)
  },
  cache: 'no-store' 
  })
 
  const homePageDataResp = await homePageData.json();


  return (
    <>
   
      <HomePage homePageData={homePageDataResp}/>
    </>

  )
}
