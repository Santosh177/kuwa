'use client'
import Head from 'next/head';
import { useEffect, useState, useRef} from 'react';
import ProductDeatil from "./productDetail/productDetail"
import ProductDiscription from "./productDiscription/productDiscription"
import ProductFaq from "./productFaq/productFaq"
import ProductReview from "./productReview/productReview"
import Footer from "@/app/[lng]/components/Footer/Footer"
import Header from "@/app/[lng]/components/Header/Header"
import style from "../[id]/page.module.scss"
// import { authHeader } from "@/lib/auth-cookies"
import RelatedProducts from "./RelatedProducts/reletedProducts";
import PageNotFound from "./PageNotFound/PageNotFound";
// import Loader from '../../components/Loader/Loader';
import Loader from "@/app/[lng]/components/Loader/Loader";
import { useLanguage } from '@/context/languageDetails';


const  AllProduct=({req}) =>{
    const [productData, setProductData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const productID = req && req.params && req.params.id || "";
  
    const productReview = useRef()
    useEffect(() => {
      const fetchProductData = async () => {
        try {
          setIsLoading(true);
          const res = await fetch(`/api/product-details?productId=${productID}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          if(res.status == 200){
            setIsLoading(false);
            const data = await res.json();
            setProductData(data);
          }
          else{
            setIsLoading(false);
            console.log("error to fetch the data")
          }
        } catch (error) {
         console.log(error)
        } finally {
          setIsLoading(false);
        }
      };
  
      fetchProductData();
    }, [productID]);
  
    const showProductReview = ()=>{
      productReview.current.scrollIntoView({ behavior: "smooth", block: "end", inline: "end" }); 
    }
  
    return (
      
      <>
    
      {/* <script type="text/javascript" src="/fresh-chat.js" async></script> */}
  
      <div className={style.productDetailContainerPage}>
  
        {/* <div className={style.routeDetail} >Home / men's performance / product</div> */}
        {productData && Object.keys(productData).length>0&&
        <>
          <Header />
          <ProductDeatil productData={productData} showProductReview={showProductReview} />
          <div className={style.allDetailDisciptionContainer}>
            <ProductDiscription productData={productData} />
          </div>
          <div id="product-review" ref={productReview}>
          <ProductReview productData={productData}  />
          </div>
          <RelatedProducts productData={productData}  />
          <ProductFaq productData={productData} />
          <Footer />
        </>}
        {(productData && Object.keys(productData).length == 0 && customHeader && Object.keys(customHeader).length !=0 )&& <PageNotFound productID={productID}/>}
      </div>
      <Loader isShow={isLoading}/>
      </>
    )
  }
  
  export default AllProduct;