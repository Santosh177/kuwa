

export const addToCart = async(data) =>{
    const addToCartResp = await fetch('/api/add-to-cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body:JSON.stringify(data)
      })
    const addToCartRespData = await addToCartResp.json();
    return addToCartRespData;
}

export const updateCartItem = async(data) =>{
    const updateCartItemResp = await fetch('/api/update-cart-item', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body:JSON.stringify(data)
      })
    const updateCartItemData = await updateCartItemResp.json();
    return updateCartItemData;
}


export const deleteCartItem = async(data) =>{
    const deleteCartItemResp = await fetch('/api/delete-cart-item', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body:JSON.stringify(data)
      })
    const deleteCartItemData = await deleteCartItemResp.json();
    return deleteCartItemData;
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




