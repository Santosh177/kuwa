"use client"


import React from "react";
import style from "./productVarients.module.scss"

const Varients = ({ setselectedVarients, variants,selectedVarients,currency }) => {
    return (
        <div className={style.varientsContainer} >
            {variants.map((item) => {
                const { id, quantity, price = {} } = item || {};
                const { varientId, retailPrice, finalPrice, discount } = price || {}
                return (
                    <div className={[style.VarientBox, ((selectedVarients === varientId)?  style.variantsSelcted : "")].join(" ")} onClick={()=>setselectedVarients(varientId)}>
                        <div>
                            <div className={style.quantity}>{quantity}</div>
                            {discount > 0 ? <div className={style.discount}>Extra {discount} {currency} off</div> :<></>}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default Varients