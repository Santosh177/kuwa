import { useAnalyticCountry } from "@/hooks/analyticHooks";





const CleverTapPushEvent = async (eventName = '', data = {}, isProduct = false) => {
    try {

        window.clevertap.event.push(eventName, data)
    } catch (e) {
        console.log('CLEVER TAP ANALYTICS PUSH EVENT VIEW ERROR', e)
    }
}
export const trackLandingPage = (data = {}) => CleverTapPushEvent("kuwa_home_page_landing", data);
export const addedToCartweb = (data = {}) => CleverTapPushEvent("kuwa_add_to_cart_landing", data);

export const trackSaveAddressAndProceed = (data = {}) => CleverTapPushEvent("kuwa_add_address_save_and_proceed", data);
export const trackAddressLandingPage = (data = {}) => CleverTapPushEvent("kuwa_add_address_landing", data);
export const trackOrderSummaryLandingPage = (data = {}) => CleverTapPushEvent("kuwa_order_summary_landing", data);
export const trackOrderSummaryProceedToNext = (data = {}) => CleverTapPushEvent("kuwa_order_summary_proceed_next", data);
export const trackViewPaymentReviewPage = (data = {}) => CleverTapPushEvent("kuwa_payments_landing", data);
export const trackClickProceedToPayBtn = (data = {}) => CleverTapPushEvent("kuwa_payments_proceed_to_pay", data);