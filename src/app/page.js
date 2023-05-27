import HomePage from "./Home/HomePage";

export default async function Home({}) {


   
  const homePageData  =  await fetch('https://api.kuwa.bevaleo.dev/module/home-page?country=1', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    next: { revalidate: 0} 
  })
  const homePageDataResp = await homePageData.json();




  console.log("homePageDataResp",homePageDataResp)

  const {kuwaUsps=[],data=[],brandUMustTry=[] } = homePageDataResp || {};


  return (
    <>
      <HomePage homePageData={homePageDataResp}/>
    </>

  )
}
