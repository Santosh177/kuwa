export const getCartItemDetails = async(data) => {
   let cartItem = []
    data.map((data, index)=>{
        const { image = {} ,quantity= 1,   } = data || {};
        console.log("CART PRODUCT",data)
        let item ={
            "image":image.imageUrl || "https://production-website-builds.s3.ap-south-1.amazonaws.com/aadar.png",
            "qty":1,
            "productName":"Korean Marine Collagen Peptides, 200 Gms",
            "retailPrice":500,
            'finalPrice':100,
            'discountType':"fixed",
            "discountAmount":50,
            "currency":"Dhs"
        }
       cartItem.push(item)

    })
    return cartItem;
}