

export const getCartItemDetails = async(data,currency) => {
   let cartItem = []
   let item = {}
    data.map((data, index)=>{
        const { image = {} ,quantity= 1,price="",originalPrice="",finalPrice="" ,  description={},id="",cartItemId="",variants,normalInventory  } = data || {};
        const {dealId="",dealListPrice="",dealDiscountPrice="",dealFinalPrice="",dealInventory="",isDealActive="",isTimerActive="",dealTag="",dealIconUrl="",countDownStartsAt="",countDownEndsAt="",currentTimerValue="",currentTimerStatus=""} = data || {}
        const discountAmount = parseInt(originalPrice) - parseInt(finalPrice);
        console.log("CART PRODUCT",data);

        if( variants && variants.pricings.length > 0){
          if(variants?.pricings[0]?.dealId && variants?.pricings[0]?.isDealActive && variants?.pricings[0]?.isTimerActive && variants?.pricings[0]?.currentTimerStatus == 'in-between' ){
            console.log("bhvah",variants.pricings[0].dealId)
            item ={
              "dealId":variants.pricings[0].dealId,
              "image":image && image.imageUrl || "https://production-website-builds.s3.ap-south-1.amazonaws.com/aadar.png",
              "qty":quantity,
              "productName":description.name || "",
              "retailPrice":variants?.pricings[0]?.dealListPrice,
              'finalPrice':variants?.pricings[0]?.dealFinalPrice,
              'discountType':"fixed",
              "discountAmount":variants?.pricings[0]?.dealDiscountPrice || 0,
              "currency":currency,
              "id":id,
              "cartItemId":cartItemId,
              "variants":variants
          }
          }
          else{
          item ={
            "image":image && image.imageUrl || "https://production-website-builds.s3.ap-south-1.amazonaws.com/aadar.png",
            "qty":quantity,
            "productName":description.name || "",
            "retailPrice":variants.pricings[0].retailPrice,
            'finalPrice':variants.pricings[0].finalPrice,
            'discountType':"fixed",
            "discountAmount":variants.pricings[0].discount || 0,
            "currency":currency,
            "id":id,
            "cartItemId":cartItemId,
            "variants":variants
        }
        }
      }
        else{
          if(dealId && isDealActive && isTimerActive
             && currentTimerStatus == "in-between"
               ){
            item ={
              "dealId":dealId,
              "image":image && image.imageUrl || "https://production-website-builds.s3.ap-south-1.amazonaws.com/aadar.png",
              "qty":quantity,
              "productName":description.name || "",
              "retailPrice":dealListPrice,
              'finalPrice':dealFinalPrice,
              'discountType':"fixed",
              "discountAmount":dealDiscountPrice || 0,
              "currency":currency,
              "id":id,
              "cartItemId":cartItemId,
              "variants":variants
          }
        }
        else{
          item ={
            "image":image && image.imageUrl || "https://production-website-builds.s3.ap-south-1.amazonaws.com/aadar.png",
            "qty":quantity,
            "productName":description.name || "",
            "retailPrice":originalPrice,
            'finalPrice':finalPrice,
            'discountType':"fixed",
            "discountAmount":discountAmount || 0,
            "currency":currency,
            "id":id,
            "cartItemId":cartItemId,
            "variants":variants,
            "normalInventory":normalInventory
        }
        }
      }
       
       cartItem.push(item)

    })
    return cartItem;
}

export const createPayloadForCartItems = async(cartData) => {
    let cartItems = [];
      console.log("createPayloadForCartItems",createPayloadForCartItems)
      if(cartData && cartData.length > 0){
        cartData.map((data,index)=>{
          if(data.variants && data.variants.variants.id){
            if(data?.variants?.pricings[0].dealId && data.variants?.pricings[0].isDealActive && data?.variants?.pricings[0].isTimerActive 
              && data?.variants?.pricings[0].currentTimerStatus == 'in-between'){
              cartItems.push({
                "dealId":data.variants.pricings[0].dealId,
                "quantity": data.quantity || 1,
                "itemId": data.id || "",
                "itemType": "Supplement",
                "price": data.variants.pricings[0].dealFinalPrice|| "",
                "orderType": "one-time",
                "isVariant": true,
                "variantId":data.variants.variants.id,
                "subscriptionDetail": null
            })
            }
            else{
              cartItems.push({
                "quantity": data.quantity || 1,
                "itemId": data.id || "",
                "itemType": "Supplement",
                "price": data.finalPrice || "",
                "orderType": "one-time",
                "isVariant": true,
                "variantId":data.variants.variants.id,
                "subscriptionDetail": null
            })
            }
           
          }
          else{
            if(data.dealId && data.isDealActive && data.isTimerActive && data.currentTimerStatus == 'in-between'){
              cartItems.push({
                "dealId": data.dealId,
                "quantity": data.quantity || 1,
                "itemId": data.id || "",
                "itemType": "Supplement",
                "price": data.dealFinalPrice || "",
                "orderType": "one-time",
                "isVariant": false,
                "subscriptionDetail": null
            })
            }
            else{
              cartItems.push({
                "quantity": data.quantity || 1,
                "itemId": data.id || "",
                "itemType": "Supplement",
                "price": data.finalPrice || "",
                "orderType": "one-time",
                "isVariant": false,
                "subscriptionDetail": null
            })
            }
           
          }
        })
      }
      return cartItems; 
}

export const createPayloadForItems = async (cartItems) => {
  console.log("cartItemscartItemscartItems",cartItems)
  
  let items = [];
   if(cartItems && cartItems.length > 0){
      cartItems.map((data,index)=>{
        if(data.variants && data.variants.variants.id){
          if(data?.variants?.pricings[0].dealId && data.variants?.pricings[0].isDealActive && data?.variants?.pricings[0].isTimerActive 
            && data?.variants?.pricings[0].currentTimerStatus == 'in-between'){
              items.push({
                "imageUrl":data.image && data.image.imageUrl || "https://d2krpu1dx8jgw5.cloudfront.net/media/subscription/Adv-Woman_Crllhff.png",
                "type":"Supplement",
                "name":data.description && data.description.name || "",
                "quantity":data.quantity || 1,
                "retailPrice":data.variants?.pricings[0].dealListPrice || "",
                "finalAmount":data.variants?.pricings[0].dealFinalPrice || "",
                "taxAmount":"8.45",
                "sku":"hari hari,MULTIPLE_ITEM,No_Coupon",
                "discountAmount":data.variants?.pricings[0].dealDiscountPrice || 0,
                "referenceId":"hari hari,MULTIPLE_ITEM,No_Coupon"
              })
            }
            else{
              items.push({
                "imageUrl":data.image && data.image.imageUrl || "https://d2krpu1dx8jgw5.cloudfront.net/media/subscription/Adv-Woman_Crllhff.png",
                "type":"Supplement",
                "name":data.description && data.description.name || "",
                "quantity":data.quantity || 1,
                "retailPrice":data.variants?.pricings[0].retailPrice || "",
                "finalAmount":data.variants?.pricings[0].finalPrice || "",
                "taxAmount":"8.45",
                "sku":"hari hari,MULTIPLE_ITEM,No_Coupon",
                "discountAmount":data.variants?.pricings[0].discount || 0,
                "referenceId":"hari hari,MULTIPLE_ITEM,No_Coupon"
              })

            }
        }
        else{
          if(data.dealId && data.isDealActive && data.isTimerActive && data.currentTimerStatus == 'in-between'){
            items.push({
              "imageUrl":data.image && data.image.imageUrl || "https://d2krpu1dx8jgw5.cloudfront.net/media/subscription/Adv-Woman_Crllhff.png",
              "type":"Supplement",
              "name":data.description && data.description.name || "",
              "quantity":data.quantity || 1,
              "retailPrice":data.dealListPrice || "",
              "finalAmount":data.dealFinalPrice || "",
              "taxAmount":"8.45",
              "sku":"hari hari,MULTIPLE_ITEM,No_Coupon",
              "discountAmount":data.dealDiscountPrice || 0,
              "referenceId":"hari hari,MULTIPLE_ITEM,No_Coupon"
            })
        }
        else{
          items.push({
            "imageUrl":data.image && data.image.imageUrl || "https://d2krpu1dx8jgw5.cloudfront.net/media/subscription/Adv-Woman_Crllhff.png",
            "type":"Supplement",
            "name":data.description && data.description.name || "",
            "quantity":data.quantity || 1,
            "retailPrice":data.originalPrice || "",
            "finalAmount":data.finalPrice || "",
            "taxAmount":"8.45",
            "sku":"hari hari,MULTIPLE_ITEM,No_Coupon",
            "discountAmount":data.discountAmount || 0,
            "referenceId":"hari hari,MULTIPLE_ITEM,No_Coupon"
          })
        }

      }
     
      })
   }
   return items; 
}

export const createPayloadForTabby = async (cartItems) => {
  let tamaraItems = [];
   if(cartItems && cartItems.length > 0){
      cartItems.map((data,index)=>{
          cartItems.push({
            "imageUrl":data.image && data.image.imageUrl || "",
            "type":"Supplement",
            "name":data.description && data.description.name || "",
            "quantity":data.quantity || 1,
            "retailPrice":data.originalPrice || "",
            "finalAmount":data.finalPrice || "",
            "taxAmount":"8.45",
            "sku":"hari hari,MULTIPLE_ITEM,No_Coupon",
            "discountAmount":0,
            "referenceId":"hari hari,MULTIPLE_ITEM,No_Coupon"
          })
      })
   }
   return tamaraItems; 
}

export const createCouponPayload = async(cartItems) => {
  let supplements = [];
  if(cartItems && cartItems.length > 0){
    cartItems.filter(item => item.normalInventory> 0)
    .map((item,index)=>{
      console.log("itemitem",item)
      if(item.variants && item.variants.variants.id){
        if(item?.variants?.pricings[0].dealId && item.variants?.pricings[0].isDealActive && item?.variants?.pricings[0].isTimerActive 
          && item?.variants?.pricings[0].currentTimerStatus == 'in-between'){
          supplements.push({"id":item.id,"quantity":item.quantity ,"isVariant":true,"variantId":item.variants.variants.id,"dealId":item?.variants?.pricings[0].dealId })

          }
          else{
            supplements.push({"id":item.id,"quantity":item.quantity ,"isVariant":true,"variantId":item.variants.variants.id})
          }
    
      }
      else{
        if(item.dealId && item.isDealActive && item.isTimerActive && item.currentTimerStatus == 'in-between'  ){
      supplements.push({"id":item.id,"quantity":item.quantity , "isVariant":false,dealId:item.dealId})

      }
      else{
        supplements.push({"id":item.id,"quantity":item.quantity , "isVariant":false})
      }



    }
    })
  }
  return supplements; 
}

export const getOutOfStockProduct = async(cartItems,currency) => {
  let outOfStockProducts = [];
  
  if (cartItems && cartItems.length > 0) {
    cartItems?.map((item, index) => {
      const { image = {}, quantity = 1, price = "", originalPrice = "", finalPrice = "", description = {}, id = "", cartItemId = "", variants, normalInventory } = item || {};
      const discountAmount = parseInt(originalPrice) - parseInt(finalPrice);
      if (normalInventory === 0) {
        let item ={
          "image":image && image.imageUrl || "https://production-website-builds.s3.ap-south-1.amazonaws.com/aadar.png",
          "qty":quantity,
          "productName":description.name || "",
          "retailPrice":originalPrice,
          'finalPrice':finalPrice,
          'discountType':"fixed",
          "discountAmount":discountAmount || 0,
          "currency":currency,
          "id":id,
          "cartItemId":cartItemId,
          "variants":variants,
          "normalInventory":normalInventory
      }
        outOfStockProducts.push(item);
      }
    });
  }
  
  return outOfStockProducts;
}


export const authHeader = async() =>{
  return (
    {
      'country':1,
      'Authorization':"Bearer "+"",
      'user':9090
    }
  )
}

export const getDialCode =(code)=> {
  let dialCodeData = {
    "SA":{
      "dialCode":"+966"
    },
    "KW":{
      "dialCode":"+965"
    },
    "BH":{
      "dialCode":"+973"
    },
    "OM":{
      "dialCode":"+968"
    },
    "QA":{
      "dialCode":"+974"
    },
    "AE":{
      "dialCode":"+971"
    }

  }
  return dialCodeData[code]['dialCode'];

}


