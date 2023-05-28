'use client';
import React,{useState} from 'react';
import { useRouter } from 'next/navigation';
import SearchCard from "./SearchCard/SearchCard";

import styles from './page.module.scss';





export default function Search() {

    const router = useRouter();

    const [ searchTxt , setSearchTxt ] = useState("")

    return (
        <>
  
        {/* // <div className={styles.searchWrapper}> */}
            <div className={styles.searchInputBox}>
                <input className={styles.searchInput} type="text" value={searchTxt} onChange={(e)=>setSearchTxt(e.target.value)} />
                <img className={styles.backArrow} src="https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/back_arrow_search.png" alt="back-arrow" onClick={()=>router.back()}/>
                {searchTxt !="" && <img className={styles.crossIcon} src=" https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/cross_icon_search.png" alt="back-arrow" onClick={()=>setSearchTxt("")}/>}

               
            </div>
            <div className={styles.searchListWrapper}>
                <div className={styles.resultFound}>15 Results found</div>
                <div>
                    <SearchCard />
                    <SearchCard />
                    <SearchCard />
                    <SearchCard />
                    <SearchCard />
                    <SearchCard />
                    <SearchCard />
                    <SearchCard />
                    <SearchCard />
                    <SearchCard />
                    <SearchCard />
                    <SearchCard />
                    <SearchCard />
                    <SearchCard />
                    <SearchCard />
                    <SearchCard />
                    <SearchCard />
                    <SearchCard />

                </div>
       
            </div>
        </>
    )
}