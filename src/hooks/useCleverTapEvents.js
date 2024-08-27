import { useCountry } from '@/context/contryDetails';
import { useAuth } from '@/context/userDetail';
function useCleverTapEvents(initialValue) {
    const { selectedCountry = {} } = useCountry();
    const { name = "", id = "", currency="" }=selectedCountry||{}
    const { isLogin = false, userData = {} } = useAuth();
   
    const onCleverTapEvent = (eventName="",data={}) => {
        console.log("cleverTap_event_name",eventName,data)
        console.log("wbjkq",isLogin)
        data['country'] = name || '';
        data['countryId'] = id || '';
        data['currency'] = currency || '';
        data['Logged'] = isLogin || false
        try{
            window.clevertap.event.push(eventName, data)
        }catch(error){
            console.log("Clevertap event Error", error)
        }
    };



    return { onCleverTapEvent };
}

export default useCleverTapEvents;