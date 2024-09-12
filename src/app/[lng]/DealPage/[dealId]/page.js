import React from "react";
import MainCategory from '../../category/comopnents/indexPage'
// import { usePathname, useSearchParams,useRouter } from "next/navigation";
// import Category from './category'
export default async function allDealProducts(){

    return(
        <>
        <MainCategory isDealPage={true}/>
        </>
    )

}