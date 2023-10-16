

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

export const getCartItem = async() =>{
    const getCartItemResp = await fetch('/api/get-cart-item', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      })
    const getCartItemData = await getCartItemResp.json();
    return getCartItemData;
}

export const getTamaraPaymentTypes = async() =>{
  const countryCode = 'BH';
  const getTamaraPaymentTypes = await fetch(`${process.env.BACKEND_END_POINT_URL}/api/v1/tamara/payment-types?countryCode=${countryCode}`, {
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





