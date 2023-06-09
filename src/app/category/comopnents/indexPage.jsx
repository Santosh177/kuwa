'use client'

import React, { useEffect, useState } from "react";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import CategoryHeader from "./CatgoryHeader/CatgoryHeader";
import FilterSection from "./FilterSection/filterSection";
import ProductSection from "./productSection/productSection";
import style from "./indexPage.module.scss"
const filterDataImg = "https://d25uasl7utydze.cloudfront.net/kuwa/filter.svg";
const sortByImg = "https://d25uasl7utydze.cloudfront.net/kuwa/sort_by.svg";


const MainCategory = ({ responseData }) => {
    const [slectedFilter, setSelectedFilter] = useState("NOT_SELCTED");
    const [selectedOptionsHead, setSelectedOptionsHead] = useState({});
    const [resposneValue,setResponseValue] = useState([])
    const handelSelectedCat = (cat, ele) => {
        // console.log(cat, ele, "cat,elecat,ele")
    }
    const fetchData = async () => {
        const { category = "", sort = "" } = selectedOptionsHead || {};
        let query = ""
        if (sort && category) {
            query = `sort=${sort}&category=${category}`
        } else if (sort && !category) {
            query = `sort=${sort}`
        } else if (!sort && category) {
            query = `category=${category}`
        };
        let url = `https://api.kuwa.bevaleo.dev/module/product/`
        if (query) {
            url = `https://api.kuwa.bevaleo.dev/module/product/?${query}`
        };
        const getProduct = await fetch(`/api/catrgories-products?paramsofCat=${url}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        const getProductData = await getProduct.json();
        setResponseValue(getProductData)
    }
    useEffect(() => {
        fetchData()
    }, [selectedOptionsHead])
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
                <FilterSection setSelectedOptionsHead={setSelectedOptionsHead} setSelectedFilter={setSelectedFilter} slectedFilter={slectedFilter} handelSelectedCat={handelSelectedCat} responseData={responseData} />
                {isHide && <ProductSection resposneValue={resposneValue}  />}
            </div >}
            {isHide && <Footer />}
        </div>
    )
}
export default MainCategory