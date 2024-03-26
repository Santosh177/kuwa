import { AuthProvider } from "@/context/userDetail";
import { CountryProvider } from "@/context/contryDetails";
import { AddressProvider } from "@/context/address";
import { CartItemProvider } from "@/context/cartItems";
import './globals.css'
import { Work_Sans } from 'next/font/google';
import { getUserDetails } from '../lib/auth';
import { getTokenCookie , getCountryCookie} from '../lib/auth-cookies';
import { cookies } from 'next/headers';
import { CountryListProvider } from "@/context/countryList";
import Script from 'next/script'
// import { Work_Sans } from 'next/font/google';
import Head from 'next/head';

const workSans = Work_Sans({ weight: ['400','500','600', '700'],
style: ['normal', 'italic'],
subsets: ['latin'],})


// export const metadata = {
//   title: 'GetKuwa: Supplements, Health &amp; Nutrition in bahrain',
//   description: 'GetKuwa helps you buy the best quality health supplements to boost your nutrition and fitness in UAE. Shop now and enjoy the benefits!',
// }

let title = 'GetKuwa: Supplements, Health &amp; Nutrition in bahrain'
let description =  'GetKuwa helps you buy the best quality health supplements to boost your nutrition and fitness in UAE. Shop now and enjoy the benefits!'


const getUser = async () => {
  const nextCookies = cookies(); 
  const token = nextCookies.get('token');
  const user = nextCookies.get('userId');
  console.log("tokentoken",token)
  if((token && token.value) || (user && user.value)  ){
    try {
      const userLoginResp  =  await fetch(`${process.env.BACKEND_END_POINT_URL}/api/v1/customer/${user.value}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: 'Bearer ' + token.value }),
        }
      })
      const userData = await userLoginResp.json();
      if(token && token.value){
        return {isLogin:true, userData:userData};
      }else{
        return {isLogin:false, userData:userData};
      }
     } catch (err) {
      return {isLogin:false,userData:null}
     }
  }else{
    return {isLogin:false,userData:null}
  }

};

const getCountryList = async() => {
  const getCountryListResp  =  await fetch(`${process.env.BACKEND_END_POINT_URL}/api/v1/active/countries/`, {
    method: 'GET',
    next: { revalidate: 300 } ,
    headers: {
      'Content-Type': 'application/json',
    },
  })
  const countryListData = await getCountryListResp.json();
  if(countryListData && countryListData.length > 0){
      return countryListData;
  }
}

export default async function RootLayout({ children }) {
  const userData = await getUser();
  const countryList = await getCountryList();
  const { isLogin= false, } = userData || {}
  let selectedCountryData = {};
  if(isLogin){
    const filteredCountry = countryList.find((data,index)=>data.id == userData.userData.country)
    if(filteredCountry){
      selectedCountryData = filteredCountry;
    }else{
      selectedCountryData = countryList && countryList[0] 
    }
    
   
  }else{
    const countryIdFromCookie = getCountryCookie();
    if(countryIdFromCookie){
      const filteredCountry = countryList.find((data,index)=>data.id == countryIdFromCookie)
      if(filteredCountry){
        selectedCountryData = filteredCountry;
      }else{
        selectedCountryData = countryList && countryList[0] 
      }
    }
  }


  const isProd = (process.env.NODE_ENV === 'pre-prod') || (process.env.NODE_ENV === 'prod')

console.log("CLEVER_TAP_FILE_CONFIG",process.env.CLEVER_TAP_FILE_CONFIG)

  return (
    <html lang="en">
      <link rel="shortcut icon" href="https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/Kuwa-Favicon-32x32_32x32.png" type="image/png"></link>
      <head>
        <script type="text/javascript" src={"/gtm.js"}></script>
        <title>{title}</title>
        <meta name="title" content={title} />
        <meta name="description" content={description} />
      </head>
      
      <body className={workSans.className}>
      <script type="text/javascript" src="https://cdn.checkout.com/js/framesv2.min.js" async></script>
      <script type="text/javascript" src={"/clevertap-stage.js"} async />
      {/* <script type="text/javascript" src={"https://d2r1yp2w7bby2u.cloudfront.net/js/clevertap.min.js"} async></script> */}
      <script type="text/javascript" src="https://checkout.tabby.ai/tabby-promo.js" async></script>
      <Script src="https://cdn.tamara.co/widget/product-widget.min.js" strategy="lazyOnload" />
      <Script src="/tamara-script.js" strategy="lazyOnload" />
      {/* <Script type="text/javascript" src="/meta-pixel-code.js" strategy="lazyOnload" /> */}
      {/* <script async src="https://www.googletagmanager.com/gtag/js?id=G-9ZH5J03SH9"></script> */}
      {/* <noscript><img height="1" width="1" style="display:none"
src="https://www.facebook.com/tr?id=292517813040924&ev=PageView&noscript=1"
/></noscript> */}
      <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-PDHHJWPJ"
      height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
    
      <CountryListProvider countryList={countryList}>
        <CountryProvider countryCode={"AE"} selectedCountryData={selectedCountryData} countryList={countryList}>
          <AuthProvider authData={userData}>
            <CartItemProvider>
            <AddressProvider >
            {children}
            </AddressProvider> 
            </CartItemProvider>       
          </AuthProvider>
        </CountryProvider>
      </CountryListProvider>
      </body>
    </html>
  )
}
