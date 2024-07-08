'use client'
import Head from 'next/head';
import { useEffect, useState, useRef} from 'react';
import ProductDeatil from "../component/productDetail/productDetail"
import ProductDiscription from "../component/productDiscription/productDiscription"
import ProductFaq from "../component/productFaq/productFaq"
import ProductReview from "../component/productReview/productReview"
import Footer from "@/app/[lng]/components/Footer/Footer"
import Header from "@/app/[lng]/components/Header/Header"
import style from "./page.module.scss"
// import { authHeader } from "@/lib/auth-cookies"
import RelatedProducts from "../component/RelatedProducts/reletedProducts";
import PageNotFound from "../component/PageNotFound/PageNotFound";
import Loader from '../../components/Loader/Loader';
import { useLanguage } from '@/context/languageDetails';

// import { cookies } from 'next/headers';


export async function generateMetadata({ params, searchParams }) {
  const {listOfLanguages , selectedLanguage, isArabic, isEnglish, changeLanguage={}} = useLanguage();

  const productID = params.id;
  // const nextCookies = cookies();
  // const language_code = nextCookies.get('language_code')?.value
  let productData ={}
  try {
    const product = await fetch(`/api/product-details?productId=${productID}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
     productData = await product.json();
  } catch (error) {
    
  }
 

  const seoTitle = productData && productData.seo && productData.seo.metaTitle || "";
  const seoDescription = productData && productData.seo && productData.seo.metaDescription || "";
  const seoKeywords = productData && productData.seo && productData.seo.keyword || "";

  const seoTitleArabic = productData && productData.seo && productData.seo.metaTitleArabic || "";
  const seoDescriptionArabic = productData && productData.seo && productData.seo.metaDescriptionArabic || "";
  const seoKeywordsArabic = productData && productData.seo && productData.seo.keywordArabic || "";
  return {
    title: isArabic ? seoTitleArabic: seoTitle || "",
    description: isArabic ? seoDescriptionArabic :seoDescription || "",
    keywords:isArabic ? seoKeywordsArabic: seoKeywords || "" ,
    imgUrl: imgUrl || "",
    url: url || ""
  };
}


const  AllProduct=(req) =>{
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
    debugger
    console.log("productReviewRef",productReview)
    productReview.current.scrollIntoView({ behavior: "smooth", block: "end", inline: "end" }); 
  }

  return (
    
    <>
  
    <script type="text/javascript" src="/fresh-chat.js" async></script>

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


