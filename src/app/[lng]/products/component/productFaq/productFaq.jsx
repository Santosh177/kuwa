"use client"
import Faq from "@/app/[lng]/components/Faq/Faq";
import React from "react";
import style from "./ProductFaq.module.scss"
import { useLanguage } from "@/context/languageDetails";


const ProductFaq = ({productData}) =>{
    const {faqs=[]} = productData || {}
    const {listOfLanguages , selectedLanguage, isArabic, isEnglish, changeLanguage={}} = useLanguage();


    if(faqs.length > 0){
        return(
            <>
            <div className={style.FrequentlyAskQuestions}>{isArabic ? "" :"Frequently Ask Questions"}</div>
            <Faq faqs={faqs} />
            </>
        )
    }else{
        return(<></>)
    }
}

export default ProductFaq