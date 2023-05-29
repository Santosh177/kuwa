"use client"
import React, { useState } from "react";
import { useCountryList } from "@/context/countryList";
import styles from './country-list.module.scss';



const CountryList = ({onSelectCountry={}}) => {
    const countryList = useCountryList();
    return(
        <div className={styles.countryListWrapper}>
            {
                countryList.map((data,index)=>{
                    return(
                        <div className={styles.countryItem} onClick={()=>onSelectCountry(data)}>{data.name}</div>
                    )
                })
            }
        </div>
    )
}

export default CountryList; 