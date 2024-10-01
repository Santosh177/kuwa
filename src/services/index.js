

export const addToCart = async(data) =>{
    const addToCartResp = await fetch('/api/add-to-cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body:JSON.stringify(data)
      })
      try {   
        const addToCartRespData = await addToCartResp.json();
        return addToCartRespData;
        
      } catch (error) {
        return {}
      }
 
}

export const updateCartItem = async(data) =>{
    const updateCartItemResp = await fetch('/api/update-cart-item', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body:JSON.stringify(data)
      })

    try {
      const updateCartItemData = await updateCartItemResp.json();
      return updateCartItemData;
    } catch (error) {
      return {}
    }

}


export const deleteCartItem = async(data) =>{
    const deleteCartItemResp = await fetch('/api/delete-cart-item', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body:JSON.stringify(data)
      })
      try {
        const deleteCartItemData = await deleteCartItemResp.json();
        return deleteCartItemData;
      } catch (error) {
        return {}
      }
    
}

export const getCartItem = async(productId="",variantId="") =>{
  console.log("productIdserver",productId,variantId)
    const getCartItemResp = await fetch(`/api/get-cart-item?productId=${productId}&variantId=${variantId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      })
    const getCartItemData = await getCartItemResp.json();
    return getCartItemData;
}
 
export const getTamaraPaymentTypes = async(selectedCountryCode="Bh") =>{
  const getTamaraPaymentTypes = await fetch(`${process.env.BACKEND_END_POINT_URL}/api/v1/tamara/payment-types?countryCode=${selectedCountryCode}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    try {
      const getTamaraPaymentData = await getTamaraPaymentTypes.json();
      return getTamaraPaymentData;
    } catch (error) {
      return [];
    }
}

export const mappingHomeSearchDealProducts = (data)=>{
  const {
    countDownEndsAt = "",
    countDownStartsAt = "",
    currency = "",
    currentDateTime = "",
    currentTimerStatus = "",
    currentTimerValue = "",
    dealDiscountPrice = "",
    dealFinalPrice = "",
    dealHeading = "",
    dealHeadingArabic = "",
    dealIconUrl = "",
    dealId = "",
    dealInventory = "",
    dealListPrice = "",
    dealTag = "",
    dealTagArabic = "",
    isDealActive = "",
    isProductBestSeller = false,
    isTimerActive = "",
    isVariantRecommended = "",
    normalInventory = "",
    productDiscount = "",
    productFinalPrice = "",
    productId = "",
    productImage = "",
    productListPrice = "",
    productName = "",
    productNameArabic = "",
    productSeoUrl = "",
    rank = "",
    variantAvailableQuantity = "",
    variantDiscount = "",
    variantFinalPrice = "",
    variantId = "",
    variantImage = "",
    variantListPrice = "",
    variantName = ""
  } = data || {};
  let cardData = {}
  console.log("mappingHomeSearchDealProducts",data)

  if(variantId){
    if(dealId && isDealActive && isTimerActive &&  currentTimerStatus == "in-between"){
      cardData = {
        "dealId":dealId || "",
        "productId":productId || "",
        "variantId":variantId,
        "productImage":variantImage || "https://production-website-builds.s3.ap-south-1.amazonaws.com/aadar.png",
        "productName":productName || "",
        "productNameArabic":productNameArabic || "",
        "seoUrl":productSeoUrl,
        "retailPrice":dealListPrice,
        'finalPrice':dealFinalPrice,
        'discountType':"fixed",
        "discount":dealDiscountPrice || 0,
        "currency":currency,
        "discountType":"",
        "tagIconUrl":dealIconUrl,
        "tag":dealTag,
        "tagArabic":dealTagArabic,
        "dealInventory":dealInventory,
        "rank": rank,
        "normalInventory":variantAvailableQuantity,
        "currentTimerStatus":currentTimerStatus,
        "isDealActive":isDealActive,
        "isTimerActive":isTimerActive,
        "isProductBestSeller":isProductBestSeller
      }
    }
    else{
      cardData={
        "variantId":variantId,
        "productId":productId,
        "productImage":variantImage || "https://production-website-builds.s3.ap-south-1.amazonaws.com/aadar.png",
        "productName":productName || "",
        "productNameArabic":productNameArabic || "",
        "seoUrl":productSeoUrl,
        "retailPrice":variantListPrice,
        'finalPrice':variantFinalPrice,
        'discountType':"fixed",
        "discount":variantDiscount || 0,
        "currency":currency,
        "variantName": variantName,
        "variantImage":variantImage,
        "normalInventory":variantAvailableQuantity,
        "isProductBestSeller":isProductBestSeller
     }
    }

  }
  else{
    if(dealId && isDealActive && isTimerActive &&  currentTimerStatus == "in-between"){
      cardData = {
        "dealId":dealId || "",
        "productId":productId || "",
        "variantId":variantId,
        "productImage":productImage || "https://production-website-builds.s3.ap-south-1.amazonaws.com/aadar.png",
        "productName":productName || "",
        "productNameArabic":productNameArabic || "",
        "seoUrl":productSeoUrl,
        "retailPrice":dealListPrice,
        'finalPrice':dealFinalPrice,
        'discountType':"fixed",
        "discount":dealDiscountPrice || 0,
        "currency":currency,
        "discountType":"",
        "tagIconUrl":dealIconUrl,
        "tag":dealTag,
        "tagArabic":dealTagArabic,
        "dealInventory":dealInventory,
        "rank": rank,
        "normalInventory":normalInventory,
        "currentTimerStatus":currentTimerStatus,
        "isDealActive":isDealActive,
        "isTimerActive":isTimerActive,
        "isProductBestSeller":isProductBestSeller
      }
    }
    else{
      cardData={
        "variantId":variantId,
        "productId":productId,
        "productImage":productImage || "https://production-website-builds.s3.ap-south-1.amazonaws.com/aadar.png",
        "productName":productName || "",
        "productNameArabic":productNameArabic || "",
        "seoUrl":productSeoUrl,
        "retailPrice":productListPrice,
        'finalPrice':productFinalPrice,
        'discountType':"fixed",
        "discount":productDiscount || 0,
        "currency":currency,
        "variantName": variantName,
        "variantImage":variantImage,
        "normalInventory":normalInventory,
        "isProductBestSeller":isProductBestSeller
     }
    }
  }

    return cardData;
  }

export const  mappingDealProducts = (data)=>{
  const {
    countDownEndsAt = "",
    countDownStartsAt = "",
    currency = "",
    currentDateTime = "",
    currentTimerStatus = "",
    currentTimerValue = "",
    dealDiscountPrice = "",
    dealFinalPrice = "",
    dealHeading = "",
    dealHeadingArabic = "",
    dealIconUrl = "",
    dealId = "",
    dealInventory = "",
    dealListPrice = "",
    dealTag = "",
    dealTagArabic = "",
    isDealActive = "",
    isProductBestSeller = false,
    isTimerActive = "",
    isVariantRecommended = "",
    normalInventory = "",
    productDiscount = "",
    productFinalPrice = "",
    productId = "",
    productImage = "",
    productListPrice = "",
    productName = "",
    productNameArabic = "",
    productSeoUrl = "",
    rank = "",
    variantAvailableQuantity = "",
    variantDiscount = "",
    variantFinalPrice = "",
    variantId = "",
    variantImage = "",
    variantListPrice = "",
    variantName = ""
  } = data || {};
  let cardData = {}

  if(variantId){
    if(dealId && isDealActive && isTimerActive &&  currentTimerStatus == "in-between"){
      cardData = {
        "dealId":dealId || "",
        "productId":productId || "",
        "variantId":variantId,
        "productImage":variantImage || "https://production-website-builds.s3.ap-south-1.amazonaws.com/aadar.png",
        "productName":productName || "",
        "productNameArabic":productNameArabic || "",
        "seoUrl":productSeoUrl,
        "dealListPrice":dealListPrice,
        'dealFinalPrice':dealFinalPrice,
        'discountType':"fixed",
        "dealDiscountPrice":dealDiscountPrice || 0,
        "currency":currency,
        "discountType":"",
        "tagIconUrl":dealIconUrl,
        "tag":dealTag,
        "tagArabic":dealTagArabic,
        "dealInventory":dealInventory,
        "rank": rank,
        "normalInventory":variantAvailableQuantity,
        "currentTimerStatus":currentTimerStatus,
        "isDealActive":isDealActive,
        "isTimerActive":isTimerActive,
        "isProductBestSeller":isProductBestSeller
      }
    }
    else{
      cardData={
        "variantId":variantId,
        "productId":productId,
        "productImage":variantImage || "https://production-website-builds.s3.ap-south-1.amazonaws.com/aadar.png",
        "productName":productName || "",
        "productNameArabic":productNameArabic || "",
        "seoUrl":productSeoUrl,
        "retailPrice":variantListPrice,
        'finalPrice':variantFinalPrice,
        'discountType':"fixed",
        "discount":variantDiscount || 0,
        "currency":currency,
        "variantName": variantName,
        "variantImage":variantImage,
        "normalInventory":variantAvailableQuantity,
        "isProductBestSeller":isProductBestSeller
     }
    }
  }
  else{
    if(dealId && isDealActive && isTimerActive &&  currentTimerStatus == "in-between"){
      cardData = {
        "dealId":dealId || "",
        "productId":productId || "",
        "variantId":variantId,
        "productImage":productImage || "https://production-website-builds.s3.ap-south-1.amazonaws.com/aadar.png",
        "productName":productName || "",
        "productNameArabic":productNameArabic || "",
        "seoUrl":productSeoUrl,
        "dealListPrice":dealListPrice,
        'dealFinalPrice':dealFinalPrice,
        'discountType':"fixed",
        "dealDiscountPrice":dealDiscountPrice || 0,
        "currency":currency,
        "discountType":"",
        "tagIconUrl":dealIconUrl,
        "tag":dealTag,
        "tagArabic":dealTagArabic,
        "dealInventory":dealInventory,
        "rank": rank,
        "normalInventory":normalInventory,
        "currentTimerStatus":currentTimerStatus,
        "isDealActive":isDealActive,
        "isTimerActive":isTimerActive,
        "isProductBestSeller":isProductBestSeller
      }
    }
    else{
      cardData={
        "variantId":variantId,
        "productId":productId,
        "productImage":productImage || "https://production-website-builds.s3.ap-south-1.amazonaws.com/aadar.png",
        "productName":productName || "",
        "productNameArabic":productNameArabic || "",
        "seoUrl":productSeoUrl,
        "retailPrice":productListPrice,
        'finalPrice':productFinalPrice,
        'discountType':"fixed",
        "discount":productDiscount || 0,
        "currency":currency,
        "variantName": variantName,
        "variantImage":variantImage,
        "normalInventory":normalInventory,
        "isProductBestSeller":isProductBestSeller
     }
    }
  }



// if(dealId && isDealActive && isTimerActive &&  currentTimerStatus == "in-between"){
//  cardData = {
//     "dealId":dealId || "",
//     "productId":productId || "",
//     "variantId":variantId,
//     "productImage":productImage || "https://production-website-builds.s3.ap-south-1.amazonaws.com/aadar.png",
//     "productName":productName || "",
//     "productNameArabic":productNameArabic || "",
//     "seoUrl":productSeoUrl,
//     "dealListPrice":dealListPrice,
//     'dealFinalPrice':dealFinalPrice,
//     'discountType':"fixed",
//     "dealDiscountPrice":dealDiscountPrice || 0,
//     "currency":currency,
//     "discountType":"",
//     "tagIconUrl":dealIconUrl,
//     "tag":dealTag,
//     "tagArabic":dealTagArabic,
//     "dealInventory":dealInventory,
//     "rank": rank,
//     "normalInventory":normalInventory,
//     "currentTimerStatus":currentTimerStatus,
//     "isDealActive":isDealActive,
//     "isTimerActive":isTimerActive
//   }
  
 
// }
// else{
//   if(variantId){
//    cardData={
//       "variantId":variantId,
//       "productId":productId,
//       "productImage":productImage || "https://production-website-builds.s3.ap-south-1.amazonaws.com/aadar.png",
//       "productName":productName || "",
//       "productNameArabic":productNameArabic || "",
//       "seoUrl":productSeoUrl,
//       "retailPrice":variantListPrice,
//       'finalPrice':variantFinalPrice,
//       'discountType':"fixed",
//       "discount":variantDiscount || 0,
//       "currency":currency,
//       "variantName": variantName,
//       "variantImage":variantImage,
//       "normalInventory":normalInventory,
//    }
//   }
//   else{
// cardData={
//   "variantId":variantId,
//       "productId":productId,
//       "productImage":productImage || "https://production-website-builds.s3.ap-south-1.amazonaws.com/aadar.png",
//       "productName":productName || "",
//       "productNameArabic":productNameArabic || "",
//       "seoUrl":productSeoUrl,
//       "retailPrice":productListPrice,
//       'finalPrice':productFinalPrice,
//       'discountType':"fixed",
//       "discount":productDiscount || 0,
//       "currency":currency,
//       "normalInventory":normalInventory,
// }
//   }
// }

return cardData;

}

export const queryParams = (productId, variantId) => {
  const params = new URLSearchParams();
  params.append('productId', productId);
  if (variantId) {
    params.append('variantId', variantId);
  }
  return params.toString();
};

export const addGoogleEvent = (data)=>{
  console.log("ga4trackData",data)
  window.dataLayer.push({...data,'event':'add_to_cart'});
  console.log("google datalayer",window.dataLayer)
}

export const saveSearchData = async(payloaddata)=>{

  
  try{
    const data = await fetch('/api/store-search-data',{
      method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payloaddata)
      })
      const searchApiDataSave = await data.json();
  }

  catch(error){
    console.error("Error saving search data", error)
  }
}







