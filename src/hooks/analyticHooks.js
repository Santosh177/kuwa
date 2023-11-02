import { useCountry } from "@/context/contryDetails"
const analyticHooks = (eventName = "", data = {}) => {
    const { selectedCountry = {} } = useCountry();

    // data['country'] = selectedCountry.name || '';
    // data['countryId'] = selectedCountry.id || '';
    // data['currency'] = selectedCountry.currency || '';
    // window.clevertap.event.push(eventName, data)
    return selectedCountry
}

export default analyticHooks;