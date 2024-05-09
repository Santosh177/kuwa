'use server'
import Home from './home';
import Mixpanel from 'mixpanel';
import { cookies } from 'next/headers';


export const mixPanelTrackEvent=(eventName, eventData,userId) => {
  const nextCookies = cookies();
  const deviceId = nextCookies.get('deviceID').value; 
  mixpanel.track(eventName, { ...eventData, "distinct_id": (userId)?userId:deviceId });
}
export const mixPanelIdentifyUser = (userId, userProperties) => {
  mixpanel.people.set(userId, userProperties);
}


const mixpanel = Mixpanel.init('d670cab0105c2c17aaea07a016f2d46f',
{  geolocate: true 
  // track_pageview: true,
  // secure_cookie: true
});

console.log("mixpanel+++",mixpanel.config.logger)

export default async function page() {
  
  const nextCookies = cookies(); 
const token = nextCookies.get('token');
const user = nextCookies.get('userId');
// mixpanel.identify(user);

  return (
    
    <div>
      <Home />
    </div>
  )
}


