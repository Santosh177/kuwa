'use client';
import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useCountry } from '@/context/contryDetails';
import SearchCard from "./SearchCard/SearchCard";

import styles from './page.module.scss';
import ProductCard from './ProductCard/ProductCard';
import TrendingSearch from './TrendingSearch/TrendingSearch';
import { mappingHomeSearchDealProducts } from '@/services';
import { useLanguage } from '@/context/languageDetails';
import { saveSearchData } from '@/services';
import Loader from '../components/Loader/Loader';





export default function Search() {

  const router = useRouter();

  const [searchTxt, setSearchTxt] = useState("");
  const [searchData, setSearchData] = useState([]);
  const { selectedCountry = {}, setSelectedCountry = {} } = useCountry();
  const [searchQuery, setSearchQuery] = useState('');
  const [showTrendingSearch, setShowTrendingSearch] = useState(true);
  const inputBoxRef = useRef(null);
  const {listOfLanguages , selectedLanguage, isArabic, isEnglish, changeLanguage={}} = useLanguage();
  const [isNoResult,setIsNoResult] = useState("")
  const [isLoading, setIsLoading] = useState(false);



  const searchDataCount = searchData && searchData.length || 0;
  const ProductIdList = searchData && searchData?.slice(0,12)?.map((data)=> data.id) || [];
  const productNameList = searchData && searchData?.slice(0,12)?.map((data) => data.productName) || [];
 
  useEffect(() => {
    let timer;

    const makeApiCall = async () => {
      setIsLoading(true)
      try {
       
        const payload = {
          "source": "website",
          "searchKey": searchQuery,
          "categoryList": null,
          "sortBy":"relevance",
          "inStock": false,
          "deal_seo_url":null,
          "categorySeoList":null,
        }
        const searchApiResp = await fetch('/api/elastic-search',{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload)
        })
        const searchApiData = await searchApiResp.json();
        const {collectionDescription ,collectionDescriptionArabic,productVariantDtoList,message } = searchApiData || {}

        let searchData = []
        if (productVariantDtoList && productVariantDtoList.length > 0) {
          searchData = []
          setIsLoading(false)
          // setIsNoResult(false)
          setIsNoResult("")
          productVariantDtoList.map((data, index) => {
            if (data && Object.keys(data).length > 0) {
              searchData.push(mappingHomeSearchDealProducts(data));
              setSearchData(searchData)
            }
          })
        } else {
          setIsLoading(false)
          searchData.push([])
          setSearchData([])
          if(message){
            setIsNoResult(message)
          }
        }
      } catch (error) {
        setIsLoading(false)
        console.error('API request failed:', error);
      }
    };

    if (searchQuery) {
      // Clear the previous timer if it exists
      if (timer) {
        clearTimeout(timer);
      }
      // Set a new timer to make the API call after a delay (e.g., 500 milliseconds)
      timer = setTimeout(makeApiCall, 1000);
    }
    // Cleanup the timer when the component unmounts
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [searchQuery]);

  useEffect(() => {
    const handleKeyDown = async (event) => {
      const payloadForSaveData = {
        "source": "website",
        "search_key": searchQuery,
        "category": null,
        "sort_by": "relevance",
        "inStock": false,
        "noOfSearchResult": searchDataCount,
        "productId": "",
        "productName": "",
        "productFinalPrice": 0,
        "productIdList": ProductIdList,
        "productNameList": productNameList,
      };
  
      if (event.key === 'Enter') {
        // Save the search data and redirect
        await saveSearchData(payloadForSaveData);
        window.location.href = `/collections?search_key=${encodeURIComponent(searchQuery)}`;
      }
    };
  
    window.addEventListener('keydown', handleKeyDown);
  
    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [searchQuery, searchData]);

console.log("isNoResults",isNoResult)
  useEffect(()=>{
    if(!searchQuery){
       setSearchData([])
    }
  },[searchQuery])

  const onSearch = (event) => {
    setSearchQuery(event);
  };


 
   const lng = localStorage.getItem("selectedLanguage") || 'en'

  const handleSeeAll = (searchQuery) => {
    const payloadForSaveData ={
      "source":"website",
      "search_key":searchQuery,
      "category":null,
      "sort_by":"relevance",
      "inStock":false,
 "noOfSearchResult":searchDataCount,
 "productId":"",
 "productName":"",
 "productFinalPrice":0,
 "productIdList":ProductIdList,
 "productNameList":productNameList
      }
    window.location.href = `/collections?search_key=${encodeURIComponent(searchQuery)}`
    saveSearchData(payloadForSaveData)
  }

  const handleBack = () =>{
    const payloadForSaveData ={
      "source":"website",
      "search_key":searchQuery,
      "category":null,
      "sort_by":"relevance",
      "inStock":false,
 "noOfSearchResult":searchDataCount,
 "productId":"",
 "productName":"",
 "productFinalPrice":0,
 "productIdList":[],
 "productNameList":[]
      }
    router.back();
    saveSearchData(payloadForSaveData)

  }

  const handleCrossSearch = ()=>{
    const payloadForSaveData ={
      "source":"website",
      "search_key":searchQuery,
      "category":null,
      "sort_by":"relevance",
      "inStock":false,
 "noOfSearchResult":searchDataCount,
 "productId":"",
 "productName":"",
 "productFinalPrice":0,
 "productIdList":[],
 "productNameList":[]
      }
   setSearchQuery("")
    saveSearchData(payloadForSaveData)
  }

  console.log("isNoResults",isNoResult)
  return (
    <>
    {/* <div> */}
      {/* // <div className={styles.searchWrapper}> */}
      <div className={styles.searchInputBox}>
        <input ref={inputBoxRef} className={styles.searchInput} autoFocus type="text" value={searchQuery} onChange={(e) =>
          onSearch(e.target.value)}  style={{ fontSize: '16px' }}  enterKeyHint="search"/>
        <img className={`${styles.backArrow} ${isArabic ? styles['backArrow-ar'] : styles['backArrow-en']}` } src="https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/back_arrow_search.png" alt="back-arrow" onClick={() => handleBack()} />
        {searchQuery != "" && <img id="cross-btn" className={styles.crossIcon} src=" https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/cross_icon_search.png" alt="back-arrow" onClick={() => handleCrossSearch()} />}

      </div>
      <div className={styles.searchListWrapper}>
      {isNoResult === "No results found" ? 
  (
    <div className={styles.resultFound}>
      {isArabic ? "لم يتم العثور على نتائج" : "No Results Found"}
    </div>
  ) : 
  (
    searchDataCount > 0 && 
    <div className={styles.resultFound}>
      {searchDataCount} {isArabic ? "نتائج تم العثور عليها" : "Results found"}
    </div>
  )
}

          <div className={styles.productCardMain}>
            {
              searchData && searchData.length > 0 && searchData.slice(0,12).map((data, index) => {

                const { id = '', productImage: image, productName:name, seoUrl = '', title = '',finalPrice = '', retailPrice = '', currency = '', discount = '', discountType = '',dealId="" ,isDealActive="",isTimerActive="",tagIconUrl="",tag="",productNameArabic=""} = data || {};
                  const cardData = {
                    productName: name,
                    finalPrice: finalPrice,
                    retailPrice: retailPrice,
                    currency: currency,
                    discount: discount,
                    discountType: discountType,
                    image: image || "",
                    id: id || "",
                    seoUrl: seoUrl || "",
                    dealId:dealId,
                    isDealActive:isDealActive,
                    isTimerActive:isTimerActive,
                    tagIconUrl:tagIconUrl,
                    tag:tag,
                    productNameArabic: productNameArabic
                  }
                return (
                  <ProductCard cardData={cardData} searchQuery={searchQuery} />
                )
              })
            }
            <div className={styles.dummyCard}></div>
            <div className={styles.dummyCard}></div>
            <div className={styles.dummyCard}></div>
            <div className={styles.dummyCard}></div>
          {searchData && searchData.length > 0 && 
          <div className={styles.seelAllBox}>
           <div id="search-container" className={styles.seeAll} onClick={() => handleSeeAll(searchQuery)}>
            See all
           </div>
          </div>
          }
          </div>
        {showTrendingSearch && !searchQuery && <TrendingSearch isShowSeeAllBtn={true} setSearchQuery={setSearchQuery} couponBanner={{}} />}
        {/* {(showTrendingSearch && !searchQuery) && <div className={styles.searchOverlay}></div>} */}
      </div>
    
      {/* </div> */}
      {<Loader isShow={isLoading} />}
    </>
  )
}