export const getCartItemDetails = async(data) => {
   let cartItem = []
    data.map((data, index)=>{
        const { image = {} ,quantity= 1,price="",originalPrice="",finalPrice="" , currency="Dhs", description={},id=""  } = data || {};
        const discountAmount = parseInt(originalPrice) - parseInt(finalPrice);
        console.log("CART PRODUCT",data)
        let item ={
            "image":image && image.imageUrl || "https://production-website-builds.s3.ap-south-1.amazonaws.com/aadar.png",
            "qty":quantity,
            "productName":description.name || "",
            "retailPrice":price,
            'finalPrice':finalPrice,
            'discountType':"fixed",
            "discountAmount":discountAmount || 0,
            "currency":currency,
            "id":id
        }
       cartItem.push(item)

    })
    return cartItem;
}

export const createPayloadForCartItems = async() => {
    let cartItems = [];
     const getCartItemResp = await fetch('/api/get-cart-item', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + "didToken",
        }
      })
      const getCartItems = await getCartItemResp.json();
      if(getCartItems && getCartItems['products'] && getCartItems['products'].length > 0){
        getCartItems['products'].map((data,index)=>{
            cartItems.push({
                "quantity": data.quantity || 1,
                "itemId": data.id || "",
                "itemType": "Supplement",
                "price": data.finalPrice || "",
                "orderType": "one-time",
                "subscriptionDetail": null
            })
        })
      }
      return cartItems; 

}