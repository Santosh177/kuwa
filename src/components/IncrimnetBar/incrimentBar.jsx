"use client"
import React from "react";
import style  from "./incriment-bar.module.scss"

const IncrimentBar = ({noOfProduct=0,setNoOfProduct={}}) =>{
    const handelOnclick = (action) =>{
        if(action === "minus" &&  noOfProduct > 1 ){
            setNoOfProduct(noOfProduct - 1)
        }
        if(action === "plus"){
            setNoOfProduct(noOfProduct + 1)
        }
    }
    return(
        <div className={style.incrimentBarContainer}>
            <div className={[style.plus,(noOfProduct === 0 ? style.lightMinus : "")].join(" ")} onClick={()=>handelOnclick("minus")} > - </div>
            <div className={style.number} >{noOfProduct}</div>
            <div className={style.plus} onClick={()=>handelOnclick("plus")} > + </div>
        </div>
    )
}

export default IncrimentBar


