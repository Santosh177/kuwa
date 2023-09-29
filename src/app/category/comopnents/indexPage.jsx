'use client'

import React, { useEffect, useState } from "react";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import FilterSection from "./FilterSection/filterSection";
import ProductSection from "./productSection/productSection";
import style from "./indexPage.module.scss"
import Loader from "@/components/Loader/Loader";
const filterDataImg = "https://d25uasl7utydze.cloudfront.net/kuwa/filter.svg";
const sortByImg = "https://d25uasl7utydze.cloudfront.net/kuwa/sort_by.svg";


const MainCategory = ({ responseData }) => {
    const [slectedFilter, setSelectedFilter] = useState("NOT_SELCTED");
    const [selectedOptionsHead, setSelectedOptionsHead] = useState({});
    const [resposneValue, setResponseValue] = useState([]);
    const [isLoding, setIsLOading] = useState(false);
    const fetchData = async () => {
        setIsLOading(true)
        const { category = "", sort = "" } = selectedOptionsHead || {};
        let query = ""
        if (sort && category) {
            query = `sort_by=${sort}&category=${category}`
        } else if (sort && !category) {
            query = `sort_by=${sort}`
        } else if (!sort && category) {
            query = `category=${category}`
        };
        const getProduct = await fetch(`/api/catrgories-products?paramsofCat=${query}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        if (getProduct) {
            const getProductData = await getProduct.json();
            setResponseValue(getProductData);
        }
        setIsLOading(false)
    }
    useEffect(() => {
        fetchData()
    }, [selectedOptionsHead])
    const isHide = slectedFilter === "NOT_SELCTED" || slectedFilter === "Sort By";
    let isShowDotForCat = false;
    if (selectedOptionsHead.category) {
        const value = (selectedOptionsHead.category).split(",")
        isShowDotForCat = value.length > 0
    }
    let isShowDotForSort = false;
    if (selectedOptionsHead && selectedOptionsHead.sort) {
        const value = selectedOptionsHead.sort
        isShowDotForSort = value.length > 4
    }
    console.log(selectedOptionsHead.sort, "slectedFilter");
    console.log(isShowDotForSort, "slectedFilter");

    return (
        <div className={style.CategoryIndexPage}>
            {isHide && <Header  />}
            {isHide && <div className={style.FilterTabOptionMobile} >
                <div className={style.FilterTabOption}>
                    <div className={style.filterContainer} onClick={() => setSelectedFilter("Filter")} >
                        {isShowDotForCat && <div className={style.dot}></div>}
                        <div className={style.filter}>
                            <img src={filterDataImg} alt="" />
                            <span>Filter</span>
                        </div>
                    </div>
                    <div className={style.filterContainer}>
                        {isShowDotForSort && <div className={style.dot}></div>}
                        <div className={style.sortBy} onClick={() => setSelectedFilter("Sort By")}>
                            <img src={sortByImg} alt="" />
                            <div>Sort By</div>
                        </div>
                    </div>
                </div>
            </div>}
            {<div className={style.productAndFilter}>
                <FilterSection setSelectedOptionsHead={setSelectedOptionsHead} setSelectedFilter={setSelectedFilter} slectedFilter={slectedFilter} responseData={responseData} />
                {isHide && <ProductSection resposneValue={resposneValue} />}
            </div >}
            {isHide && <Footer />}
            <Loader isShow={isLoding} />
        </div>
    )
}
export default MainCategory