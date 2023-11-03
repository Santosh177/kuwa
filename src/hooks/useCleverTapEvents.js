import { useCountry } from '@/context/contryDetails';
function useCleverTapEvents(initialValue) {
    const { selectedCountry = {} } = useCountry();
    const { name = "", id = "", currency="" }=selectedCountry||{}
    const onCleverTapEvent = (eventName="",data={}) => {
        data['country'] = name || '';
        data['countryId'] = id || '';
        data['currency'] = currency||"";
        try{
            window.clevertap.event.push(eventName, data)
        }catch(error){
            console.log("Clevertap event Error", error)
        }
    };



    return { onCleverTapEvent };
}

export default useCleverTapEvents;