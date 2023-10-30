export const addCleverTapCountryEvents = (key,value) => {
    window.clevertap.event.push(key, {
        "Country": value,
    });
}

