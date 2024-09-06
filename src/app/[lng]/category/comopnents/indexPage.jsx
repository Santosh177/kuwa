'use client'
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Footer from "@/app/[lng]/components/Footer/Footer";
import Header from "@/app/[lng]/components/Header/Header";
import FilterSection from "./FilterSection/filterSection";
import ProductSection from "./productSection/productSection";
import style from "./indexPage.module.scss"
import Loader from "@/app/[lng]/components/Loader/Loader";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useCountry } from "@/context/contryDetails";
const filterDataImg = "https://d25uasl7utydze.cloudfront.net/kuwa/filter.svg";
const sortByImg = "https://d25uasl7utydze.cloudfront.net/kuwa/sort_by.svg";
import { useLanguage } from "@/context/languageDetails";


const MainCategory = ({ isDealPage }) => {
    console.log("isDealPage", isDealPage)
    const searchParams = useSearchParams();
    const { selectedCountry = {} } = useCountry();
    const router = useRouter();
    const [slectedFilter, setSelectedFilter] = useState("NOT_SELCTED");
    const [selectedOptionsHead, setSelectedOptionsHead] = useState({});
    const [resposneValue, setResponseValue] = useState([]);
    const [isLoding, setIsLOading] = useState(false);
    const [isLodingProduct, setIsLoadingProduct] = useState(false);
    const [responseData, setResponseData] = useState({})
    const [description,setDescription] = useState(null)
   

    const [paramsData, setParamsData] = useState({})
    const params = useParams();
    const dealSeoUrl = params.dealId || "";
    const collectionSeoUrl = params.id || null
    const { listOfLanguages, selectedLanguage, isArabic, isEnglish, changeLanguage = {} } = useLanguage();
    console.log("collectionSeoUrl", collectionSeoUrl)

    useEffect(() => {
        const category = searchParams.get('category');
        const sort = searchParams.get('sort');
        const AVAILABLE = searchParams.get('AVAILABLE');
        if (category || sort || AVAILABLE || (collectionSeoUrl && collectionSeoUrl !== "null" )) {
            const paramsFilter = {};
            if(collectionSeoUrl) paramsFilter.categorySeoList = [collectionSeoUrl]
            if (category) paramsFilter.category = category.split(',');
            if (sort) paramsFilter.sort = sort;
            if (AVAILABLE) paramsFilter.AVAILABLE = AVAILABLE;

            setParamsData(paramsFilter);
        } else {
            setParamsData({
                category: [],
                sort: "",
                AVAILABLE: [],
                categorySeoList:[]
            });
        }

        if (searchParams.has("search_key")) {
            const search = searchParams.get('search_key');
            setParamsData({ ...paramsData, searchKey: search })
            // router.replace(window.location.pathname);
        }

    }, [])

    useEffect(() => {

        if (paramsData && Object.keys(paramsData).length > 0) {
            fetchFilterCollectionData()
        }

        // if(paramsData && Object.keys(paramsData).length > 0 && searchParams.has('category') && searchParams.has('sort')){

        // }


    }, [paramsData])


    const fetchFilterCollectionData = async () => {
        setIsLoadingProduct(true);
        const { category = [], sort = "", searchKey = "",AVAILABLE="",categorySeoList=[] } = paramsData || {};
        let dealQueryValue = "";
        let query = {
            "source": "website",
            "searchKey": "",
            "categoryList": null,
            "sortBy":"relevance",
            "inStock": false,
            "deal_seo_url":null,
            "categorySeoList":null,
        }
        console.log("paramsData",paramsData)
        if (sort && category.length > 0) {
            dealQueryValue = `sort_by=${(sort)}&category=${encodeURIComponent(category.join(','))}`;
            query = {...query,
                sortBy: sort,
                categoryList: category,
                categorySeoList:categorySeoList
            }
        } else if (sort && category.length === 0) {

            dealQueryValue = `sort_by=${(sort)}`;
            query = {...query,
                sortBy: sort,
                categorySeoList:categorySeoList
            }
        } else if (!sort && category.length > 0) {
            dealQueryValue = `category=${encodeURIComponent(category.join(','))}`;
            query = {...query,
                categoryList: category,
                categorySeoList:categorySeoList
            }
        }
        else if (!sort && category.length === 0 ){
            dealQueryValue = "";
            query = {...query,
                categorySeoList:categorySeoList
            }
        }

        if (searchKey) {
            if (!sort && category.length === 0) {
                dealQueryValue = `search_key=${(searchKey)}`;
                query = {...query,
                    searchKey: searchKey,
                    categorySeoList:categorySeoList
                }
            } else {
                dealQueryValue += `&search_key=${(searchKey)}`;
                query = {
                   ...query,
                   searchKey: searchKey,
                }
            }
        }

        if (AVAILABLE && AVAILABLE.length > 0 ) {
            if (!sort && category.length === 0 && !searchKey) {
                dealQueryValue = `inStock=true`;
                query = {...query,
                    inStock: true,
                    categorySeoList:categorySeoList
                }
            } else {
                dealQueryValue += `&inStock=true`;
                query = {
                   ...query,
                    inStock: true,
                }
            }
        }
        if(!AVAILABLE || (AVAILABLE && AVAILABLE.length == 0)){
            if (!sort && category.length === 0 && !searchKey) {
                dealQueryValue = `inStock=false`;
                query = {...query,
                    inStock: false,
                    categorySeoList:categorySeoList
                }
            } else {
                dealQueryValue += `&inStock=false`;
                query = {
                   ...query,
                    inStock: false,
                }
            }   
        }
        console.log("payload",query)
        let endpoint = `${process.env.BACKEND_END_POINT_URL}/module/main/search/product?country=${selectedCountry.id}`;

        if (isDealPage) {
            endpoint = `${process.env.BACKEND_END_POINT_URL}/api/v1/deals/${dealSeoUrl}?country_id=${selectedCountry.id}&${dealQueryValue}`;
        }

        try {
            const response = await fetch('/api/elastic-search', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify(query)
            });
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            
            const data = await response.json();
            console.log("searchAllData",data)
            const {collectionDescription ,collectionDescriptionArabic,productVariantDtoList } = data || {}
            setResponseValue(productVariantDtoList);
            setDescription(isArabic ? collectionDescriptionArabic : collectionDescription )
           
        } catch (error) {
            console.error('Error fetching data:', error);
            // window.location.href = '/'
            // Handle error or set appropriate state
        } finally {
            setIsLoadingProduct(false);
        }
    };

    const fetchFilterData = async () => {
        setIsLOading(true)
        const getFilterData = await fetch(`/api/category-filter`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        if (responseData && Object.keys(responseData).length == 0) {
            const getFilterDataResp = await getFilterData.json();
            setResponseData(getFilterDataResp);
        }
        setIsLOading(false)
    }

    const fetchDealFilterData = async () => {
        setIsLOading(true)
        const getFilterData = await fetch(`/api/deal-category-filter?dealSeoUrl=${dealSeoUrl}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        if (responseData && Object.keys(responseData).length == 0) {
            const getFilterDataResp = await getFilterData.json();
            setResponseData(getFilterDataResp);
        }
        setIsLOading(false)
    }

    useEffect(() => {
        if (isDealPage) {
            fetchDealFilterData();
        }
        else {
            fetchFilterData()
        }

    }, [])


    const isHide = slectedFilter === "NOT_SELCTED" || slectedFilter === "Sort By";
    let isShowDotForCat = false;
    if ((paramsData && paramsData['category'] && paramsData['category'].length > 0) || (paramsData && paramsData['AVAILABLE'] && paramsData['AVAILABLE'].length > 0)) {
        // const value = (selectedOptionsHead.category).split(",")
        isShowDotForCat = true
    }
    let isShowDotForSort = false;
    if (paramsData && paramsData['sort']) {
        // const value = selectedOptionsHead.sort
        isShowDotForSort = true

    }
    console.log(selectedOptionsHead.sort, "slectedFilter");
    console.log(isShowDotForSort, "slectedFilter");

    return (
        <div className={style.CategoryIndexPage}>

            {isHide && <Header setParamsData={setParamsData} paramsData={paramsData} isShowSeeAllBtn={false} />}

            {isHide && <div className={`${style.FilterTabOptionMobile} ${isArabic ? style['FilterTabOptionMobile-ar'] : style['FilterTabOptionMobile-en']}` } >
                <div className={style.FilterTabOption}>
                    <div className={style.filterContainer} onClick={() => setSelectedFilter("Filter")} >
                        {isShowDotForCat && <div className={style.dot}></div>}
                        <div className={style.filter}>
                            <img src={filterDataImg} alt="" />
                            <span>{isArabic ? "فلتر" : "Filter"}</span>
                        </div>
                    </div>
                    <div className={style.filterContainer}>
                        {isShowDotForSort && <div className={style.dot}></div>}
                        <div className={style.sortBy} onClick={() => setSelectedFilter("Sort By")}>
                            <img src={sortByImg} alt="" />
                            <div>{isArabic ? "ترتيب حسب" : "Sort By"}</div>
                        </div>
                    </div>

                </div>
            </div>}

            {<div className={style.productAndFilter}>
                {<FilterSection paramsData={paramsData} setParamsData={setParamsData} setSelectedOptionsHead={setSelectedOptionsHead} setSelectedFilter={setSelectedFilter} slectedFilter={slectedFilter} responseData={responseData} />}
                {isHide && <ProductSection resposneValue={resposneValue} isDealPage={isDealPage} description={description}/>}
            </div >}
            {isHide && responseData && Object.keys(responseData).length > 0 && <Footer />}
            <Loader isShow={isLoding} />
            <Loader isShow={isLodingProduct} />
        </div>
    )
}
export default MainCategory