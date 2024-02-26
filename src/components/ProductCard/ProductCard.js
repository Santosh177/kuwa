import { useRouter } from 'next/navigation';
import styles from './product-card.module.scss';
import { useState } from 'react';


import { useAuth } from '@/context/userDetail';




const ProductCard = ({cardData,addToCart={},style={},emailId,handleNotify=()=>{}}) => {

    const { isLogin=false ,userData = {}} = useAuth();

    console.log("shdhsabhja",useAuth());
    

    // const deviceId = cookies.getItem("deviceID")
    // console.log("deviceId",deviceId)

     const router = useRouter();
    const { productName="", finalPrice="" , retailPrice="", currency="", discount="", image="",id="" , seoUrl="",normalInventory=1} = cardData || {}
    const btnName = normalInventory > 0 ? "Add to cart" : "Notify me"

    const payload = {
        productId:id,
        // variantId:"",
        deviceId:"",
        email: isLogin ? userData.emailAddress : emailId ,
        userId: isLogin ? userData.id : null
    }
    return(
        <>
        <div className={styles.productCardItem} onClick={()=>window.location.href=`/products/`+seoUrl}>
            <div className={styles.productCardWrapper} style={{...style}}>
              {normalInventory <= 0 && <div className={styles.outOfStockTxt}>Out of stock</div>}
                <div className={styles.productImgWrapper}>
                    <div className={styles.productImgContainer}>
                        <img className={styles.productImg} src={image} alt='product-name' />
                    </div>
                </div>
                <div className={styles.textContent}>
                <div className={styles.productName}>{productName}</div>
               {  <div className={styles.discountTag} style={(discount > 0)?{opacity:1}:{opacity:0}}><span>Save</span> {currency} {discount}</div>}
                {(discount > 0)?<div className={styles.price}>{currency} {finalPrice}  <span className={[styles.price,styles.retailPrice].join(" ")}>{currency} {retailPrice}</span></div>:<div className={styles.price}>{currency} {finalPrice} </div>}
                <div className={styles.btn} onClick={(e)=>
                    {
                        e.stopPropagation()
                        if(normalInventory> 0){
                            addToCart();
                        }
                        else{
                            handleNotify(payload,isLogin);
                        }
                        }}>{btnName}</div>
            </div>
            </div>
        </div>
        
        </>
    )



}


export default ProductCard;

  