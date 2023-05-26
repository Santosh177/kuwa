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
                <div className={[style.tabs,(selectedTab === "discription" && style.bottomBorder)].join(" ")} onClick={() => handelOnclick("discription")}>Description</div>
                <div className={[style.tabs,(selectedTab === "ingridents" && style.bottomBorder)].join(" ")} onClick={() => handelOnclick("ingridents")} >Ingredients & Dosage</div>
                <div className={[style.tabs,(selectedTab === "benfits" && style.bottomBorder)].join(" ")} onClick={() => handelOnclick("benfits")} >Benefits</div>
            </div>
            <div className={style.selectedTabData}>
                <div dangerouslySetInnerHTML={{ __html: selectedTabData}}></div>
            </div>
        </div>
    )
}

export default ProductDiscription