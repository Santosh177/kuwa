import AllProduct from '../component/index';
import { authHeader } from "@/lib/auth-cookies"
import { cookies } from 'next/headers';


export async function generateMetadata({ params, searchParams }) {
  const productID = params.id;
  const nextCookies = cookies();
  const language_code = nextCookies.get('language_code')?.value;
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
    title: language_code=='ar' ? seoTitleArabic: seoTitle || "",
    description: language_code=='ar' ? seoDescriptionArabic :seoDescription || "",
    keywords:language_code=='ar' ? seoKeywordsArabic: seoKeywords || "" ,
    // imgUrl: imgUrl || "",
    // url: url || ""
  };
}

export default async function ProductInfo(req){
  return (
    <>
    <script type="text/javascript" src="/fresh-chat.js" async></script>
    <AllProduct req={req}/>
    </>
  )
}


