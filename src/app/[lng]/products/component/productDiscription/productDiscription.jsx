// "use client"
// import React, { useEffect, useState } from "react";
// import style from "./ProductDiscription.module.scss"
// import { useLanguage } from "@/context/languageDetails";
// const ProductDiscription = ({ productData}) => {
//     const { benefits = "", description = "", ingredients = "", benefitsArabic="",descriptionArabic="",ingredientsArabic=""} =productData ||  {}
//     const [selectedTabData, setSelectedTabData] = useState("");
//     const [selectedTab, setSelectedTab] = useState("")
//     const {listOfLanguages , selectedLanguage, isArabic, isEnglish, changeLanguage={}} = useLanguage();

//     const handelOnclick = (action) => {
//         if (action === "discription") {
//             setSelectedTab("discription")
//             setSelectedTabData(description)

//         }
//         if (action === "ingridents") {
//             setSelectedTab("ingridents")
//             setSelectedTabData(ingredients)
//         }
//         if (action === "benfits") {
//             setSelectedTab("benfits")
//             setSelectedTabData(benefits)
//         }
//     }
//     useEffect(() => {
//         setSelectedTab("discription")
//         setSelectedTabData(description)
//     }, [])
//     return (
//         <div className={style.productDiscriptionContainer}>
//             <div className={style.tabSectionContainer}>
//                 <div className={[style.tabs,(selectedTab === "discription" && style.bottomBorder)].join(" ") } onClick={() => handelOnclick("discription")}>{isArabic ?"" :"Description"}</div>
//             {ingredients!="<p><br></p>" && ingredients && <div className={[style.tabs,(selectedTab === "ingridents" && style.bottomBorder)].join(" ")} onClick={() => handelOnclick("ingridents")} >{isArabic ? "" :"Ingredients & Dosage"}</div>}
//            {benefits!= "<p><br></p>" && benefits && <div className={[style.tabs,(selectedTab === "benfits" && style.bottomBorder)].join(" ")} onClick={() => handelOnclick("benfits")} >{isArabic ? "" :"Benefits"}</div>}
//             </div>
//             <div className={style.selectedTabData}>
//                 <div dangerouslySetInnerHTML={{ __html: selectedTabData && selectedTabData.replace(/&lt;br&gt;/g, '')}}></div>
//             </div>
//         </div>
//     )
// }

// export default ProductDiscription

"use client"
import React, { useEffect, useState } from "react";
import style from "./ProductDiscription.module.scss"
import { useLanguage } from "@/context/languageDetails";
import useCleverTapEvents from "@/hooks/useCleverTapEvents";
import { mixPanelTrackEvent } from "@/app/[lng]/page";
import { useAuth } from "@/context/userDetail";

const ProductDiscription = ({ productData }) => {
  const {
    name="",
    id="",
    benefits = "",
    description = "",
    ingredients = "",
    benefitsArabic = "",
    descriptionArabic = "",
    ingredientsArabic = ""
  } = productData || {};
  
  const [selectedTabData, setSelectedTabData] = useState("");
  const [selectedTab, setSelectedTab] = useState("");
  const { isArabic } = useLanguage();
  const clevertapEvent = useCleverTapEvents();
  const {isLogin=false,userData={}} = useAuth();

  const handelOnclick = (action) => {
    const trackData = {
      "Product Name":name,
      "Product ID":id,
      "Page URL":window.location.href
    }
    if (action === "description") {
      setSelectedTab("description");
      setSelectedTabData(isArabic ? descriptionArabic : description);
      clevertapEvent.onCleverTapEvent("kuwa_pdp_description",trackData)
      if(isLogin){
        mixPanelTrackEvent("kuwa_pdp_description",trackData,userData.id)
      }
      else{
        mixPanelTrackEvent("kuwa_pdp_description",trackData)
      }

    }
    if (action === "ingredients") {
      setSelectedTab("ingredients");
      setSelectedTabData(isArabic ? ingredientsArabic : ingredients);
      clevertapEvent.onCleverTapEvent("kuwa_pdp_ingredients",trackData)
      if(isLogin){
        mixPanelTrackEvent("kuwa_pdp_ingredients",trackData,userData.id)
      }
      else{
        mixPanelTrackEvent("kuwa_pdp_ingredients",trackData)
      }
    }
    if (action === "benefits") {
      setSelectedTab("benefits");
      setSelectedTabData(isArabic ? benefitsArabic : benefits);
      clevertapEvent.onCleverTapEvent("kuwa_pdp_benefits",trackData)
      if(isLogin){
        mixPanelTrackEvent("kuwa_pdp_benefits",trackData,userData.id)
      }
      else{
        mixPanelTrackEvent("kuwa_pdp_benefits",trackData)
      }
    }
  };

  useEffect(() => {
    setSelectedTab("description");
    setSelectedTabData(isArabic ? descriptionArabic : description);
  }, [isArabic, description, descriptionArabic]);

  return (
    <div className={style.productDiscriptionContainer}>
      <div className={style.tabSectionContainer}>
        <div
          className={[
            style.tabs,
            selectedTab === "description" && style.bottomBorder
          ].join(" ")}
          onClick={() => handelOnclick("description")}
        >
          {isArabic ? "الوصف" : "Description"}
        </div>
        {ingredients !== "<p><br></p>" && ingredients && (
          <div
            className={[
              style.tabs,
              selectedTab === "ingredients" && style.bottomBorder
            ].join(" ")}
            onClick={() => handelOnclick("ingredients")}
          >
            {isArabic ? "المكونات والجرعة" : "Ingredients & Dosage"}
          </div>
        )}
        {benefits !== "<p><br></p>" && benefits && (
          <div
            className={[
              style.tabs,
              selectedTab === "benefits" && style.bottomBorder
            ].join(" ")}
            onClick={() => handelOnclick("benefits")}
          >
            {isArabic ? "الفوائد" : "Benefits"}
          </div>
        )}
      </div>
      <div className={style.selectedTabData}>
        <div
          dangerouslySetInnerHTML={{
            __html: selectedTabData && selectedTabData.replace(/&lt;br&gt;/g, "")
          }}
        ></div>
      </div>
    </div>
  );
};

export default ProductDiscription;

