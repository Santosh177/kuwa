"use client"
import React, { useEffect, useState } from 'react'
// import RelatedProductsCard from './RelatedProductsCard'
import "./authorDetailsPage.scss"
import ProductSlider from '@/components/ProductSlider/ProductSlider'
import { useSearchParams } from 'next/navigation'
import RelatedProducts from '@/app/products/component/RelatedProducts/reletedProducts'
import PageHeader from '@/components/PageHeader/PageHeader'
import Footer from '@/components/Footer/Footer'
import Loader from '@/components/Loader/Loader'
function AuthorDetailsPage() {
  const [articleData,setArticleData]=useState({});
  const [isLoading, setIsLoading] = useState(false)
  const search=window.location.href;
  let seoName = search.split("/");
  seoName = seoName[seoName.length-1];
  console.log("search", search, seoName)
  const getArticleData=async()=>{
    try{
      setIsLoading(true);
      const articleDataRes = await fetch(`${process.env.BACKEND_END_POINT_URL}/health-hub/${seoName}?countryId=1`);
      const articleData = await articleDataRes.json()||{};
      if (Object.keys(articleData) && Object.keys(articleData).length>0){
        setArticleData({ ...articleData });
      }
      setIsLoading(false);
    }catch(error){
    console.log("Error while fetching article details",error)
      setIsLoading(false);
    }
  }
  useEffect(()=>{
    getArticleData();
  },[])
  const { healthHubCategory = "", articleNameEnglish = "", articleDescriptionEnglish = "", articleContentEnglish = "", primaryImage = "", author = {}, createdAt = "", suggestedSupplements=[] }=articleData||{};
  const { first_name="", last_name="" } = author||{};
  let relatedProduct=[];
  if (suggestedSupplements && suggestedSupplements.length>0){
    console.log("hii","hello")
    let itemProduct={
      id:"",
      image:"",
      name:"",
      price:{
        currency:"",
        discount:"",
        discountType: "", 
        finalPrice:"",
        retailPrice:"",
      },
      seoUrl:"",
      title:""
    }
    suggestedSupplements.map((item,index)=>{
      const { id = "", internalName = "", finalPrice = "", retailPrice = "", discountValue = "", discountType = "", currency = "", image = "", seoUrl="" }=item||{};
      itemProduct["id"]=id;
      itemProduct["image"] = image;
      itemProduct["seoUrl"] = seoUrl;
      itemProduct["title"] = internalName;
      itemProduct["name"] = internalName;
      itemProduct["price"]["currency"]=currency;
      itemProduct["price"]["discount"] = discountValue;
      itemProduct["price"]["discountType"] = discountType;
      itemProduct["price"]["finalPrice"] = finalPrice;
      itemProduct["price"]["retailPrice"] = retailPrice;
      relatedProduct.push(itemProduct);
      console.log("itemProduct", itemProduct)

    })
  }
  console.log("relatesdProduct", suggestedSupplements)
  const product={};
  const data=[1,2,3]
  return (
    <>
      <PageHeader/>
      <div className='article-main'>
        <div className='article-cont'>
          <div className='article-category'>{healthHubCategory}</div>
          <div className='article-ask-ques'>
            {articleNameEnglish}
          </div>
          <div className='author-desc'>
            <div className='author-desc-cont'>
              <img src={primaryImage} alt="" />
              <span className='author-title'>by {first_name} {last_name}</span>
              <span className='dot'>&#x2022;</span>
              <span className='published-dob'>{createdAt && createdAt.split("T")[0].split("-").reverse().join("-")}</span>
            </div>
          </div>
          <div className='article-desc'>
            {articleDescriptionEnglish}
          </div>
          <div className='article-author-img'>
            <img src={primaryImage} alt="" />
          </div>
          <div className='article-desc' dangerouslySetInnerHTML={{ __html:articleContentEnglish }}>
 
          </div>
        </div>
      </div>
      {/* <ProductSlider data={product} index="9" totalRow={data.length || 1} /> */}
      {relatedProduct && relatedProduct.length>0 &&  <RelatedProducts productData={{relatedProduct:[...relatedProduct]}}/>}
      <Footer/>
      <Loader isShow={isLoading} />

    </>
  )
}

export default AuthorDetailsPage
