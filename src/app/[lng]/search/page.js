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





export default function Search() {

  const router = useRouter();

  const [searchTxt, setSearchTxt] = useState("");
  const [searchData, setSearchData] = useState([]);
  const { selectedCountry = {}, setSelectedCountry = {} } = useCountry();
  const [searchQuery, setSearchQuery] = useState('');
  const [showTrendingSearch, setShowTrendingSearch] = useState(true);
  const inputBoxRef = useRef(null);
  const {listOfLanguages , selectedLanguage, isArabic, isEnglish, changeLanguage={}} = useLanguage();


  useEffect(() => {
    let timer;

    const makeApiCall = async () => {
      try {
        const countryId = selectedCountry && selectedCountry.id || "";
        const payload = {
          "source": "website",
          "searchKey": searchQuery,
          "categoryList": null,
          "sortBy":"relevance",
          "inStock": true,
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
        // const searchApiResp = await fetch(`${process.env.BACKEND_END_POINT_URL}/module/search/product/?country=${countryId}`, {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        //   body: JSON.stringify({key: searchQuery})
        // })
        const searchApiData = await searchApiResp.json();
        let searchData = []
        if (searchApiData && searchApiData.length > 0) {
          searchData = []
          searchApiData.map((data, index) => {
            if (data && Object.keys(data).length > 0) {
              // const productData = {
              //   productImage: data.productImageUrl || "",
              //   productName: data.name || "",
              //   id: data.id || "",
              //   seoUrl: data.seoUrl || "",
              //   price: {
              //     finalPrice: data.specialPrice,
              //     retailPrice: data.price,
              //     currency: data.currency,
              //     discount: data.discount,
              //     discountType: data.discountType,
              //   }
              // }
              searchData.push(mappingHomeSearchDealProducts(data));
              setSearchData(searchData)
            }
          })
        } else {
          searchData.push([])
          setSearchData([])
        }
        // Process the API response here
        // setApiData(response.data);
      } catch (error) {
        console.error('API request failed:', error);
      }
    };
    if (searchQuery) {
      // Clear the previous timer if it exists
      if (timer) {
        clearTimeout(timer);
      }
      // Set a new timer to make the API call after a delay (e.g., 500 milliseconds)
      timer = setTimeout(makeApiCall, 500);
    }
    // Cleanup the timer when the component unmounts
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [searchQuery]);
  useEffect(()=>{
    if(!searchQuery){
       setSearchData([])
    }
  },[searchQuery])

  // const onSearch1 = async (searchValue) => {
  //   setSearchTxt(searchValue);
  //   console.log("customHeadercustomHeader", selectedCountry)
  //   const countryId = selectedCountry && selectedCountry.id || "";
  //   const searchApiResp = await fetch(`${process.env.BACKEND_END_POINT_URL}/module/search/product/?key=${searchValue}&country=${countryId}`, {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     }
  //   })
  //   const searchApiData = await searchApiResp.json();
  //   let searchData = []
  //   if (searchApiData && searchApiData.length > 0) {
  //     searchApiData.map((data, index) => {
  //       const sData = data['product'] || {}
  //       if (sData) {
  //         const productData = {
  //           productImage: sData.productImage && sData.productImage.productImageUrl || "",
  //           productName: sData.productDescription && sData.productDescription.name || "",
  //           id: sData.id || "",
  //           seoUrl: data.seoUrl || "",
  //         }
  //         searchData.push(productData);
  //         setSearchData(searchData)
  //       }
  //     })
  //   } else {
  //     searchData.push([])
  //     setSearchData([])
  //   }
  // }

  const onSearch = (event) => {
    setSearchQuery(event);
  };

  const searchDataCount = searchData && searchData.length || 0;
  // const handleOutsideClick = (event) => {
  //   if (inputBoxRef.current && !inputBoxRef.current.contains(event.target) && event.target && (event.target.id != 'trending-search')) {
  //     // Clicked outside the input box
  //     // Close the popup
  //     if (event.target.id==="cross-btn"){
  //       setShowTrendingSearch(true);
  //     }else{
  //       setShowTrendingSearch(false);
  //     }
  //   }
  //   else {
  //     setShowTrendingSearch(true);
  //   }
  // };
   const lng = localStorage.getItem("selectedLanguage") || 'en'
  const handleSeeAll = (searchQuery) => {
    window.location.href = `/${lng}/collections?search_key=${encodeURIComponent(searchQuery)}`
  }
  // useEffect(() => {
  //   // Attach event listener for clicks outside the input box
  //   document.addEventListener('click', handleOutsideClick);

  //   // Cleanup the event listener when the component unmounts
  //   return () => {
  //     document.removeEventListener('click', handleOutsideClick);
  //   };
  // }, []);
  // useEffect(()=>{
  //   setShowTrendingSearch(true);
  // },[])
  return (
    <>
      {/* // <div className={styles.searchWrapper}> */}
      <div className={styles.searchInputBox}>
        <input ref={inputBoxRef} className={styles.searchInput} autoFocus type="text" value={searchQuery} onChange={(e) =>
          onSearch(e.target.value)} />
        <img className={`${styles.backArrow} ${isArabic ? styles['backArrow-ar'] : styles['backArrow-en']}` } src="https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/back_arrow_search.png" alt="back-arrow" onClick={() => router.back()} />
        {searchQuery != "" && <img id="cross-btn" className={styles.crossIcon} src=" https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/cross_icon_search.png" alt="back-arrow" onClick={() => setSearchQuery("")} />}

      </div>
      <div className={styles.searchListWrapper}>
        <div className={styles.resultFound}>{searchDataCount} {isArabic ? " تم العثور على نتائج" : "Results found"}</div>
          <div className={styles.productCardMain}>
            {
              searchData.map((data, index) => {

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
                  <ProductCard cardData={cardData} />
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
    </>
  )
}