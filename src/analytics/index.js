// "use client";
// import { useCountry } from "@/context/contryDetails";

export const addCleverTapCountryEvents = (key,value) => {
    window.clevertap.event.push(key, {
        "Country": value,
    });
}

function clevertap(){
    const selectedCountry=useCountry();
    console.log("selectedCountry", selectedCountry);

}
// clevertap();

const CleverTapPushEvent = async (eventName = '', data = {}, isProduct = false) => {
    // const store = window.INITIAL_STATE || {}
    // const { countryDetails = {}, languageDetails = {} } = store || {};
    // const { selectedCity = {}, selectedCountry = {} } = countryDetails || {};
    // const { country_name = "" } = selectedCountry || {};
    // const { selectedLanguage = {} } = languageDetails || {};
    // const { language_name = "" } = selectedLanguage || {};
    // const getCountryName = country_name || "United Arab Emirates";
    // const getSelectedLang = language_name;
    try {
        // data['CountryName'] = getCountryName || '';
        // data['Language'] = getSelectedLang || '';
        // data['city'] = selectedCity && selectedCity.city_name || "";
        window.clevertap.event.push(eventName, data)
    } catch (e) {
        console.log('CLEVER TAP ANALYTICS PUSH EVENT VIEW ERROR', e)
    }
}
//commonn event 
export const trackUSerClcikWeb = (data = {}) => CleverTapPushEvent("user_view-web", data);

export const trackLandingPage = (data = {}) => CleverTapPushEvent("landing_view-web", data);

export const trackLandingPageProd = (data = {}) => CleverTapPushEvent("test_prod_view-web", data);
export const trackLandingPageForSND = (data = {}) => CleverTapPushEvent("snd_micro_page", data);

//menu clicks
export const trackMenuClickWeb = (data = {}) => CleverTapPushEvent("menu_click-web", data);

//navbarCliked 
export const navbaritemclickClickWeb = (data = {}) => CleverTapPushEvent("navbar_item_click-web", data);
export const trackLanguageTrack = (data = {}) => CleverTapPushEvent("menu_click_language-web", data);
export const trackclickcountryweb = (data = {}) => CleverTapPushEvent("menu_click_country-web", data);
export const trackselectedclickcountryweb = (data = {}) => CleverTapPushEvent("menu_click_country_selection-web", data);
export const trackaccountdropdownweb = (data = {}) => CleverTapPushEvent("account_dropdown_click-web", data);
export const trackpopupclickcancel = (data = {}) => CleverTapPushEvent("popup_click_cancel-web", data);

