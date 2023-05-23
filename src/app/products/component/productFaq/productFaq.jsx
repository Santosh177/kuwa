// "use client"
import Faq from "@/components/Faq/Faq";
import React from "react";
import style from "./ProductFaq.module.scss"


const ProductFaq = ({productData}) =>{
    const {faqs=[]} = productData || {}

    return(
        <>
        <div className={style.FrequentlyAskQuestions}>Frequently Ask Questions</div>
        <Faq faqs={faqs} />
        </>
    )
}

export default ProductFaq