"use client"
import React from "react";
import style from "./productVarients.module.scss"
const Varients = ({ setselectedVarients, variants,selectedVarients,currency, onResetViewCartState}) => {
    return (
        <div className={style.varientsContainer} >
            {variants.map((item) => {
                const { variants, pricings = {} } = item || {};
                const {id='',image='',name='',productId='',quantity=''} = variants || {}
                const {countryId='',discount='',finalPrice='',retailPrice='',variantId=NaN} = pricings[0] || {}
                const discountAmount = retailPrice-finalPrice
                console.log("variantDiscountAmount", discountAmount)
                return (
                    <div className={[style.VarientBox, ((selectedVarients === variantId)?  style.variantsSelcted : "")].join(" ")} onClick={()=>
                    {
                        onResetViewCartState(true)
                        // if(selectedVarients === variantId){
                        //     setselectedVarients("")
                        // }else{
                            setselectedVarients(variantId)
                        // }
                    }}>
                        <div>
                            <div className={style.quantity}>{name}</div>
                            {discountAmount > 0 ? <div className={style.discount}>Extra {discountAmount} off</div> :<></>}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default Varients