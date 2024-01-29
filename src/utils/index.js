

export const getCartItemDetails = async(data,currency) => {
   let cartItem = []
    data.map((data, index)=>{
        const { image = {} ,quantity= 1,price="",originalPrice="",finalPrice="" ,  description={},id="",cartItemId="",variants  } = data || {};
        const discountAmount = parseInt(originalPrice) - parseInt(finalPrice);
        console.log("CART PRODUCT",data)
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
            "variants":variants
        }
       cartItem.push(item)

    })
    return cartItem;
}

export const createPayloadForCartItems = async(cartData) => {
    let cartItems = [];
    
      if(cartData && cartData.length > 0){
        cartData.map((data,index)=>{
          if(data.variants && data.variants.variants.id){
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
        })
      }
      return cartItems; 
}

export const createPayloadForItems = async (cartItems) => {
  console.log("cartItemscartItemscartItems",cartItems)
  let items = [];
   if(cartItems && cartItems.length > 0){
      cartItems.map((data,index)=>{
        items.push({
            "imageUrl":data.image && data.image.imageUrl || "https://d2krpu1dx8jgw5.cloudfront.net/media/subscription/Adv-Woman_Crllhff.png",
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
     cartItems.map((item,index)=>{
      console.log("itemitem",item)
      if(item.variants && item.variants.variants.id){
      supplements.push({"id":item.id,"quantity":item.quantity ,"isVariant":true,"variantId":item.variants.variants.id})
      }
      else
      supplements.push({"id":item.id,"quantity":item.quantity , "isVariant":false})
     })
  }
  return supplements; 
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


