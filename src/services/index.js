

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
const {countDownEndsAt="",countDownStartsAt="",currency="",name="",dealDiscountPrice="",dealFinalPrice="",dealId="",id="",dealListPrice="",seoUrl="",productImageUrl="",price="",specialPrice="",isDealActive="",isTimerActive="",tagIconUrl="",discount="",dealTag="",currentTimerStatus="",currentTimerValue="",nameArabic} = data || {}
  console.log("mappingHomeSearchDealProducts",data)

  let cardData={}
  if(dealId && isDealActive && isTimerActive &&  currentTimerStatus == "in-between" ){
    cardData={
      "id":id || "",
      "dealId":dealId || "",
      "isDealActive":isDealActive,
      "isTimerActive":isTimerActive,
      "productImage":productImageUrl || "https://production-website-builds.s3.ap-south-1.amazonaws.com/aadar.png",
      "productName":name || "",
      "seoUrl":seoUrl ,
      "retailPrice":dealListPrice,
      'finalPrice':dealFinalPrice,
      'discountType':"fixed",
      "discount":dealDiscountPrice || 0,
      "currency":currency,
      "discountType":"",
      "tagIconUrl":tagIconUrl,
      "tag":dealTag,
      "currentTimerStatus":currentTimerStatus,
      "productNameArabic":nameArabic
      }


   
  }
    else{
      cardData = {
        "id":id || "",
        "productImage":productImageUrl || "https://production-website-builds.s3.ap-south-1.amazonaws.com/aadar.png",
        "productName":name || "",
        "seoUrl":seoUrl ,
        "retailPrice":price,
        'finalPrice':specialPrice,
        'discountType':"fixed",
        "discount":discount || 0,
        "currency":currency,
        "discountType":"",
        "productNameArabic":nameArabic
      }
      
    }
    return cardData;
  }

export const  mappingDealProducts = (data)=>{
 const {
    currency= "",
    productImage= "",
    productId= "",
    productName= "",
    productNameArabic = "",
    countDownStartsAt="",
    countDownEndsAt="",
    dealId="",
    dealListPrice="",
    dealDiscountPrice="",
    dealFinalPrice= "",
    dealInventory="",
    rank="",
    productSeoUrl="",
    productListPrice= "",
    productFinalPrice = "",
    productDiscount = "",
    normalInventory = "",
    variantId="",
    variantName = "",
    variantImage = "",
    variantListPrice = "",
    variantFinalPrice = "",
    variantDiscount = "",
    isDealActive="",
    isTimerActive="",
    dealTag="",
    dealTagArabic="",
    dealIconUrl="",
    currentTimerStatus="",
    currentTimerValue="",
    currentDateTime=""
  } = data || {}
  let cardData = {}
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
    "isTimerActive":isTimerActive
  }
  
 
}
else{
  if(variantId){
   cardData={
      "variantId":variantId,
      "productId":productId,
      "productImage":productImage || "https://production-website-builds.s3.ap-south-1.amazonaws.com/aadar.png",
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
      "normalInventory":normalInventory,
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
      "normalInventory":normalInventory,
}
  }
}

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







