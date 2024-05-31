import Head from 'next/head';
import ProductDeatil from "../component/productDetail/productDetail"
import ProductDiscription from "../component/productDiscription/productDiscription"
import ProductFaq from "../component/productFaq/productFaq"
import ProductReview from "../component/productReview/productReview"
import Footer from "@/app/[lng]/components/Footer/Footer"
import Header from "@/app/[lng]/components/Header/Header"
import style from "./page.module.scss"
import { authHeader } from "@/lib/auth-cookies"
import RelatedProducts from "../component/RelatedProducts/reletedProducts";
import PageNotFound from "../component/PageNotFound/PageNotFound";
import { cookies } from 'next/headers';


export async function generateMetadata({ params, searchParams }) {
  const productID = params.id;
  const nextCookies = cookies();
  const language_code = nextCookies.get('language_code')?.value

  const customHeader = await authHeader();
  let productData ={}
  try {
    const product = await fetch(`${process.env.BACKEND_END_POINT_URL}/module/product-page/seo/${productID}`, {
      headers: { ...customHeader },
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
    title: language_code == "ar" ? seoTitleArabic: seoTitle || "",
    description: language_code == "ar" ? seoDescriptionArabic :seoDescription || "",
    keywords:language_code == "ar" ? seoKeywordsArabic: seoKeywords || "" ,
    // imgUrl: imgUrl || "",
    // url: url || ""
  };
}


export default async function AllProduct(req) {
  const params = req.params
  const productID = req && req.params && req.params.id || "";
  const customHeader = await authHeader();
  console.log("customHeader",customHeader)
  let productData = {}
   try {
    const res = await fetch(`${process.env.BACKEND_END_POINT_URL}/module/product-page/seo/${productID}`, {
      headers: { ...customHeader },
    });
     productData = await res.json();
   } catch (error) {
   }

  return (
    
    <>
  
       <script type="text/javascript" src="/fresh-chat.js" async></script>

    <div className={style.productDetailContainerPage}>

      {/* <div className={style.routeDetail} >Home / men's performance / product</div> */}
      {productData && Object.keys(productData).length>0&&
      <>
        <Header />
        <ProductDeatil productData={productData} />
        <div className={style.allDetailDisciptionContainer}>
          <ProductDiscription productData={productData} />
        </div>
        <ProductReview productData={productData} />
        <RelatedProducts productData={productData}  />
        <ProductFaq productData={productData} />
        <Footer />
      </>}
      {(productData && Object.keys(productData).length == 0 && customHeader && Object.keys(customHeader).length !=0 )&& <PageNotFound productID={productID}/>}
    </div>
    </>
  )
}


