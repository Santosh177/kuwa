'use client'
import styles from './cart-item-card.module.scss';


import { useLanguage } from '@/context/languageDetails';



const CartItemCard = ({data,onUpdateItem={},onDeleteItem={},paymentPage,index,outOfStockPopUp}) => {
    const {listOfLanguages , selectedLanguage, isArabic, isEnglish, changeLanguage={}} = useLanguage();

    console.log("CartItemCardCartItemCard",data)
    const { image="" , qty="" , productName="",retailPrice="", finalPrice="",discountType="",discountAmount="",currency="", id="", variants,dealId="",normalInventory="",productNameArabic =""} = data || {};
    let payloadDataIncrement={};
    let payloadDataDecrement = {}
    console.log("quantity",qty)
    if(variants && variants.pricings.length > 0){
        payloadDataIncrement={product:id,quantity:qty+1,dealId:dealId,isVariant:true,variantId:variants?.variants?.id}
    }
    else{
        payloadDataIncrement={product:id,quantity:qty+1,dealId:dealId,isVariant:false,variantId:null}
    }
    if(variants && variants.pricings.length > 0){
        payloadDataDecrement={product:id,quantity:qty-1,dealId:dealId,isVariant:true,variantId:variants?.variants?.id}
    }
    else{
        payloadDataDecrement={product:id,quantity:qty-1,dealId:dealId,isVariant:false,variantId:null}
    }
    return(
        <div >
         {paymentPage == true ? 
        <div>
          {/* { normalInventory > 0 && */}
            <div className={styles.PaymentcartItemCard}>

            <div className={styles.PaymentcartItemInfo}>
                <div className={styles.Paymentindex + " " + "."}>{index+1}</div>
                <img src={ variants===null ? image : variants.variants.image}></img>
                <div className={`${styles.paymentItem} ${isArabic ? styles['paymentItem-ar'] : styles['paymentItem-en'] }`}>
                <div className={`${styles.PaymentitemName} ${isArabic ? styles['PaymentitemName-ar'] : styles['PaymentitemName-en'] }`}>{isArabic ? productNameArabic : productName}</div>
                <div className={styles.quantity}>{isArabic ? "الكمية" : "qty"}: {qty}</div>
                </div>
                 </div>
               <div className={`${styles.PaymentpriceContainer} ${isArabic ? styles['PaymentpriceContainer-ar'] : '' }`}>
                    <div className={styles.PaymentfinalPrice}>{currency + " " + finalPrice}</div>
                    {discountAmount>0 &&<div className={styles.PaymentretailPrice}>{currency + " " + retailPrice}</div>}

                </div>
                </div>
{/* } */}
            </div>
            
            :
            <>
            <div className={styles.cartItemCard}>
            <div className={styles.cartItemContainer}>
                <img src={variants=== null || variants == undefined  ? image : variants?.variants?.image}></img>
                {normalInventory<=0 ? 
                 <div className={`${styles.outOfStockTxt} ${isArabic ? styles['outOfStockTxt-ar'] : styles['outOfStockTxt-en']}` }>{isArabic ? "غير متوفر" : "Out of stock"}</div>
                  : 
                  <div className={styles.quantityContainer}>
                    <div className={styles.quantityBtn} onClick={()=>(qty > 1) && onUpdateItem(payloadDataDecrement)}>-</div>
                    <span>{qty}</span>
                    <div className={styles.quantityBtn} onClick={()=>onUpdateItem(payloadDataIncrement)}>+</div>
                    </div>
                }
            </div>
            <div className={styles.cartItemInfo}>
            <div className={styles.itemName} style={outOfStockPopUp ? {fontSize: "12px"} : {}}>{isArabic ? productNameArabic : productName}</div>
                <div className={styles.discountTag} style={(discountAmount > 0)?{opacity:1}:{opacity:0}}>
                    <div className={styles.discountText}>{isArabic ? " حفظ" : "Save"}</div>
                    <div className={styles.discountPrice}>{currency + " " + discountAmount}</div>
                </div>
               <div className={styles.priceContainer}>
                    <div className={styles.finalPrice}>{currency + " " + finalPrice}</div>
                    {discountAmount > 0 &&<div className={styles.retailPrice}>{currency + " " + retailPrice}</div>}
                </div>
            </div>
        {outOfStockPopUp ? <div></div> :    <img className={`${styles.deleteIcon} ${isArabic ? styles['deleteIcon-ar'] : styles['deleteIcon-en']}`} onClick={()=>onDeleteItem()} src='https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/delete.png' alt='delete-icon'/>}
            </div>
    </>
}
        </div>
    )



}


export default CartItemCard;

  