// "use client"
import Faq from "@/components/Faq/Faq";
import React from "react";
import style from "./ProductFaq.module.scss"


const ProductFaq = ({productData}) =>{
    const {faqs=[]} = productData || {}

    if(faqs.length > 0){
        return(
            <>
            <div className={style.FrequentlyAskQuestions}>Frequently Ask Questions</div>
            <Faq faqs={faqs} />
            </>
        )
    }else{
        return(<></>)
    }
}

export default ProductFaq