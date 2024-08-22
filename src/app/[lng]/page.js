'use server'
import Home from './home';
import Mixpanel from 'mixpanel';
import { cookies } from 'next/headers';


const mixpanel = Mixpanel.init('d670cab0105c2c17aaea07a016f2d46f',
  {  
    geolocate: true 
    // track_pageview: true,
    // secure_cookie: true
  });

export const mixPanelTrackEvent=(eventName, eventData,userId,clientIpAddress) => {
  console.log("clientIp",clientIpAddress)
  const nextCookies = cookies();
  const deviceId = nextCookies.get('deviceID').value; 
  const countryId = nextCookies.get('countryId').value;
  eventData['countryId'] = countryId
  // eventData['Device'] = deviceType;
  // eventData['Source'] = pageType;
  mixpanel.track(eventName,
     { ...eventData,
       "distinct_id": (userId)?userId:deviceId ,
       "$ip": clientIpAddress
      });
}
export const mixPanelIdentifyUser = (userId, userProperties) => {
  mixpanel.people.set(userId, userProperties);
}



console.log("mixpanel+++",mixpanel.config.logger)

export default async function page({req}) {
  console.log("mixpanelbjbejbw",req)
  return (
    
    <div>
      <Home  />
    </div>
  )
}


