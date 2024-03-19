"use client"
import React, { useEffect, useState } from "react";
import style from "./ProductDiscription.module.scss"
const ProductDiscription = ({ productData}) => {
    const { benefits = "", description = "", ingredients = "" } =productData ||  {}
    const [selectedTabData, setSelectedTabData] = useState("");
    const [selectedTab, setSelectedTab] = useState("")
    const handelOnclick = (action) => {
        if (action === "discription") {
            setSelectedTab("discription")
            setSelectedTabData(description)

        }
        if (action === "ingridents") {
            setSelectedTab("ingridents")
            setSelectedTabData(ingredients)
        }
        if (action === "benfits") {
            setSelectedTab("benfits")
            setSelectedTabData(benefits)
        }
    }
    useEffect(() => {
        setSelectedTab("discription")
        setSelectedTabData(description)
    }, [])
    return (
        <div className={style.productDiscriptionContainer}>
            <div className={style.tabSectionContainer}>
                <h2 className={[style.tabs,(selectedTab === "discription" && style.bottomBorder)].join(" ") } onClick={() => handelOnclick("discription")}>Description</h2>
            {ingredients!="<p><br></p>" && ingredients && <h2 className={[style.tabs,(selectedTab === "ingridents" && style.bottomBorder)].join(" ")} onClick={() => handelOnclick("ingridents")} >Ingredients & Dosage</h2>}
           {benefits!= "<p><br></p>" && benefits && <h2 className={[style.tabs,(selectedTab === "benfits" && style.bottomBorder)].join(" ")} onClick={() => handelOnclick("benfits")} >Benefits</h2>}
            </div>
            <div className={style.selectedTabData}>
                <div dangerouslySetInnerHTML={{ __html: selectedTabData && selectedTabData.replace(/&lt;br&gt;/g, '')}}></div>
            </div>
        </div>
    )
}

export default ProductDiscription