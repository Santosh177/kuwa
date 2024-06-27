'use server'
import Home from './home';
import Mixpanel from 'mixpanel';
import { cookies } from 'next/headers';
// import { languages } from "../i18n/settings";

// export async function generateStaticParams() {
//   return languages.map((lng) => ({ lng }))
// }


export const mixPanelTrackEvent=(eventName, eventData,userId,clientIpAddress) => {
  console.log("clientIp",clientIpAddress)
  const nextCookies = cookies();
  const deviceId = nextCookies.get('deviceID').value; 
  mixpanel.track(eventName,
     { ...eventData,
       "distinct_id": (userId)?userId:deviceId ,
       "$ip": clientIpAddress
      });
}
export const mixPanelIdentifyUser = (userId, userProperties) => {
  mixpanel.people.set(userId, userProperties);
}


const mixpanel = Mixpanel.init('fd32fde56940d1b4118cc3c508f7729f',
{  
  geolocate: true 
  // track_pageview: true,
  // secure_cookie: true
});

console.log("mixpanel+++",mixpanel.config.logger)

export default async function page() {
  
  return (
    
    <div>
      <Home  />
    </div>
  )
}


