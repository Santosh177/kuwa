
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
    return (
        <div>
            <MainCategory  responseData ={responseData}/>
        </div>
      
    )
}
export default Category