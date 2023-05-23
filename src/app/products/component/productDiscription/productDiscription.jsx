"use client"
import React, { useEffect, useState } from "react";
import style from "./ProductDiscription.module.scss"
const ProductDiscription = ({ productData }) => {
    const { benefits = "Premature ejaculation is a common issue faced by 40% of men at some point in their lives. However, this problem can be addressed naturally with Ayurveda. AADAR's Endure", description = "Premature ejaculation is a common issue faced by 40% o", ingredients = "Capsules are designed to help men increase" } = {}
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
                <div>{selectedTabData}</div>
            </div>
        </div>
    )
}

export default ProductDiscription