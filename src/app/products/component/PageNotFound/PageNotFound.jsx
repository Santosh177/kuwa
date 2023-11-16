'use client';
import React, { useEffect, useState } from "react";
import Lottie from "react-lottie";
import style from './pageNotFound.module.scss';
import ProductPageNotFound from './product-page-no-found.json'
import PageHeader from "@/components/PageHeader/PageHeader";

const PageNotFound = ({productID=""}) => {


    const defaultOptions ={
        loop: true,
        autoplay: true,
        animationData: ProductPageNotFound,
    }


    useEffect(()=>{
        try {
            if(window && window.clevertap){
             window.clevertap.event.push("kuwa_product_details_page_error", {
                    "SeoUrl":productID
            });
            } 
        } catch (error) {
            
        }
           
    },[])
    return(
        <>
            <PageHeader headerName="" />
      
            <div className={style.pageNotFoundWrapper}>
                <div>  <Lottie options={defaultOptions}/></div>
            <div className={style.pageNotFoundErrorTxtOne}>Oops! Something Went Wrong</div>
            <div className={style.pageNotFoundErrorTxtTwo}>We couldn't find the page you're looking for. It seems like there's a glitch in the system.</div>
            <div className={style.backToHomepage} onClick={()=>window.location.href = '/'}>Back to homepage</div>
            </div>
        </>
    )
}

export default PageNotFound;