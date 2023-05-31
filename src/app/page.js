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
    next: { revalidate: 0} 
  })
  const homePageDataResp = await homePageData.json();



  return (
    <>
      <HomePage homePageData={homePageDataResp}/>
    </>

  )
}
