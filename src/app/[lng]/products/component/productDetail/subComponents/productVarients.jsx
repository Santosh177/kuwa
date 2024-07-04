"use client"
import React from "react";
import style from "./productVarients.module.scss"
import { useLanguage } from "@/context/languageDetails";
const Varients = ({ setselectedVarients, variants,selectedVarients,currency, onResetViewCartState}) => {
    const {listOfLanguages , selectedLanguage, isArabic, isEnglish, changeLanguage={}} = useLanguage();

    return (
        <div className={style.varientsContainer} >
            {variants.map((item) => {
                const { variants, pricings = {} } = item || {};
                const {id='',image='',name='',productId='',quantity=''} = variants || {}
                const {countryId='',discount='',finalPrice='',retailPrice='',variantId=NaN} = pricings[0] || {}
                // const discountAmount = retailPrice-finalPrice
                const discountAmount = parseFloat(retailPrice-finalPrice).toFixed(2)
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
                            {discountAmount > 0 ? <div className={style.discount}>{isArabic ? "إضافي" : "Extra"} {discountAmount} {isArabic ? "خصم" : "off"}</div> :<></>}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default Varients