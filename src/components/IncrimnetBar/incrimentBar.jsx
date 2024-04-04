"use client"
import React from "react";
import style  from "./incriment-bar.module.scss"

const IncrimentBar = ({noOfProduct=0,setNoOfProduct={} , onResetViewCartState={},selectedVariantQuantity,normalInventory }) =>{
    const handelOnclick = (action) =>{
        onResetViewCartState(true)
        if(action === "minus" &&  noOfProduct > 1 ){
            setNoOfProduct(noOfProduct - 1)
           
        }
        if(selectedVariantQuantity==null){
            if(action === "plus"  && noOfProduct <20 && noOfProduct<normalInventory ){
                setNoOfProduct(noOfProduct + 1);
               
            }
        }
        else{
            if(action === "plus"  && noOfProduct <20 && noOfProduct<selectedVariantQuantity ){
                setNoOfProduct(noOfProduct + 1);
               
            } 
        }
       
    }
    return(
        <div className={style.incrimentBarContainer}>
            <div className={[style.plus,(noOfProduct === 0 ? style.lightMinus : "")].join(" ")} onClick={()=>handelOnclick("minus")} ><span> - </span></div>
            <div className={style.number} >{noOfProduct}</div>
            <div className={style.plus} onClick={()=>handelOnclick("plus")} > + </div>
        </div>
    )
}

export default IncrimentBar


