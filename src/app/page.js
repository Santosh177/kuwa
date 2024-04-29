'use server'
import Home from './home';
import Mixpanel from 'mixpanel';


export const trackEvent=(eventName, eventData,userId) => {
  mixpanel.track(eventName, { ...eventData, userId });
}

export const identifyUser = (userId, userProperties) => {
  // Identify the user with Mixpanel and set user properties
  mixpanel.people.set(userId, userProperties);
}


const mixpanel = Mixpanel.init('d670cab0105c2c17aaea07a016f2d46f');
console.log("Mixpanel+++",mixpanel.people)

export default async function page() {
  
  return (
    <div>
      <Home />
    </div>
  )
}


