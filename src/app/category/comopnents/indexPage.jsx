'use client'

import React, { useState } from "react";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import CategoryHeader from "./CatgoryHeader/CatgoryHeader";
import FilterSection from "./FilterSection/filterSection";
import ProductSection from "./productSection/productSection";
import style from "./indexPage.module.scss"

const filterDataImg = "https://d25uasl7utydze.cloudfront.net/kuwa/filter.svg";
const sortByImg = "https://d25uasl7utydze.cloudfront.net/kuwa/sort_by.svg";


const MainCategory = ({ responseData }) => {
    const [slectedFilter, setSelectedFilter] = useState("NOT_SELCTED")
    const handelSelectedCat = (cat, ele) => {
        console.log(cat, ele, "cat,elecat,ele")
    }
    const isHide = slectedFilter === "NOT_SELCTED" || slectedFilter === "Sort By";
    return (
        <div className={style.CategoryIndexPage}>
            {isHide && <Header />}
            {isHide && <div className={style.FilterTabOptionMobile} >
                <div className={style.FilterTabOption}>
                    <div className={style.filter} onClick={() => setSelectedFilter("Filter")} >
                        <img src={filterDataImg} alt="" />
                        <span>Filter</span>
                    </div>
                    <div className={style.sortBy} onClick={() => setSelectedFilter("Sort By")}>
                        <img src={sortByImg} alt="" />
                        <div>Sort By</div>
                    </div>
                </div>
            </div>}
            {<div className={style.productAndFilter}>
                <FilterSection setSelectedFilter={setSelectedFilter} slectedFilter={slectedFilter} handelSelectedCat={handelSelectedCat} responseData={responseData} />
                {isHide && <ProductSection />}
            </div >}
            {isHide && <Footer />}
        </div>
    )
}
export default MainCategory