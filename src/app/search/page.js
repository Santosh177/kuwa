'use client';
import React,{useState} from 'react';
import { useRouter } from 'next/navigation';
import { useCountry } from '@/context/contryDetails';
import SearchCard from "./SearchCard/SearchCard";

import styles from './page.module.scss';





export default function Search() {

    const router = useRouter();

    const [ searchTxt , setSearchTxt ] = useState("");
    const [searchData, setSearchData] = useState([]);
    const {selectedCountry={},setSelectedCountry={}} = useCountry();

    const onSearch = async(searchValue) => {
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

    const searchDataCount = searchData && searchData.length || 0;
    console.log("searchDatasearchData",searchData)

    return (
        <>
  
        {/* // <div className={styles.searchWrapper}> */}
            <div className={styles.searchInputBox}>
                <input className={styles.searchInput} type="text" value={searchTxt}onChange={(e)=>
                            onSearch(e.target.value)} />
                <img className={styles.backArrow} src="https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/back_arrow_search.png" alt="back-arrow" onClick={()=>router.back()}/>
                {searchTxt !="" && <img className={styles.crossIcon} src=" https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/cross_icon_search.png" alt="back-arrow" onClick={()=>setSearchTxt("")}/>}

               
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