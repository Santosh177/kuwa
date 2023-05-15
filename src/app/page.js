import Image from 'next/image'
import styles from './page.module.css';
import Homew from './Home';

export default async function Home({data}) {


   
  const homePageData  =  await fetch('https://api.kuwa.bevaleo.dev/module/home-page?country=1', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  const homePageDataResp = await homePageData.json();




  console.log("homePageDataResp",data)


  return (
    <>
        <Homew></Homew>
        <div>ss</div>
    </>

  )
}
