
import React from "react";
import MainCategory from "../comopnents/indexPage";
import { authHeader } from "@/lib/auth-cookies";
import CouponInfo from "@/app/Home/CouponInfo/CouponInfo";

const Category = async() => {
    const customHeader = await authHeader();
    const res = await fetch('https://api.kuwa.bevaleo.dev/module/product/side-bar', {
      headers: {...customHeader},
    })
    const responseData = await res.json();
    const data = await fetch('https://api.kuwa.bevaleo.dev/module/home-page');
    const response = await data.json();
    console.log("gupta",response)
    return (
        <div>
            <MainCategory couponBanner={response.couponBanner} responseData ={responseData}/>
        </div>
      
    )
}
export default Category