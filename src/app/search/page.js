'use client';
import React,{useState,useEffect} from 'react';
import { useRouter } from 'next/navigation';
import { useCountry } from '@/context/contryDetails';
import SearchCard from "./SearchCard/SearchCard";

import styles from './page.module.scss';





export default function Search() {

    const router = useRouter();

    const [ searchTxt , setSearchTxt ] = useState("");
    const [searchData, setSearchData] = useState([]);
    const {selectedCountry={},setSelectedCountry={}} = useCountry();
    const [searchQuery, setSearchQuery] = useState('');

    console.log("searchDatasearchData",searchData)
    useEffect(() => {
      let timer;
  
      const makeApiCall = async () => {
        try {
          const countryId = selectedCountry && selectedCountry.id || "";
          const searchApiResp = await fetch(`${process.env.BACKEND_END_POINT_URL}/module/search/product/?key=${searchQuery}&country=${countryId}`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              }
            })
          const searchApiData = await searchApiResp.json();
          let searchData = []
          if(searchApiData && searchApiData.length > 0 ){
              searchData = []
              searchApiData.map((data,index)=>{
                  const sData = data['product'] || {}
                  if(sData){
                      const productData = {
                          productImage : sData.productImage && sData.productImage.productImageUrl || "",
                          productName: sData.productDescription && sData.productDescription.name || "",
                          id: sData.id || "",
                          seoUrl: data.seoUrl || ""
                      }
                      searchData.push(productData);
                      setSearchData(searchData)
                  }
                 
              })
  
          }else{
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

    const onSearch1 = async(searchValue) => {
        setSearchTxt(searchValue);
        console.log("customHeadercustomHeader",selectedCountry)
        const countryId = selectedCountry && selectedCountry.id || "";
        const searchApiResp = await fetch(`${process.env.BACKEND_END_POINT_URL}/module/search/product/?key=${searchValue}&country=${countryId}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            }
          })
        const searchApiData = await searchApiResp.json();
        let searchData = []
        if(searchApiData && searchApiData.length > 0 ){
            searchApiData.map((data,index)=>{
                const sData = data['product'] || {}
                if(sData){
                    const productData = {
                        productImage : sData.productImage && sData.productImage.productImageUrl || "",
                        productName: sData.productDescription && sData.productDescription.name || "",
                        id: sData.id || "",
                        seoUrl: data.seoUrl || ""
                    }
                    searchData.push(productData);
                    setSearchData(searchData)
                }
            })
        }else{
            searchData.push([])
            setSearchData([])
        }
    }

    const onSearch = (event) => {
        setSearchQuery(event);
      };

    const searchDataCount = searchData && searchData.length || 0;
    console.log("searchDatasearchData",searchData)

    return (
        <>
  
        {/* // <div className={styles.searchWrapper}> */}
            <div className={styles.searchInputBox}>
                <input className={styles.searchInput} autoFocus type="text" value={searchQuery} onChange={(e)=>
                            onSearch(e.target.value)} />
                <img className={styles.backArrow} src="https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/back_arrow_search.png" alt="back-arrow" onClick={()=>router.back()}/>
                {searchQuery !="" && <img className={styles.crossIcon} src=" https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/cross_icon_search.png" alt="back-arrow" onClick={()=>setSearchQuery("")}/>}

               
            </div>
            <div className={styles.searchListWrapper}>
                <div className={styles.resultFound}>{searchDataCount} Results found</div>
                <div>

                {
                        searchData.map((data, index)=>{
                            console.log("searchDatasearchData",data)
                            return(
                                <SearchCard searchData = {data}/>
                            )
                        })
                    }

                </div>
       
            </div>
        </>
    )
}