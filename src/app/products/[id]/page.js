
import ProductDeatil from "../component/productDetail/productDetail"
import ProductDiscription from "../component/productDiscription/productDiscription"
import ProductFaq from "../component/productFaq/productFaq"
import ProductReview from "../component/productReview/productReview"
import Footer from "@/components/Footer/Footer"
import Header from "@/components/Header/Header"
import style from "./page.module.scss"
import { authHeader } from "@/lib/auth-cookies"
import RelatedProducts from "../component/RelatedProducts/reletedProducts";
import PageNotFound from "../component/PageNotFound/PageNotFound";


export async function generateMetadata({ params, searchParams }) {
  const productID = params.id;

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

  return {
    title: seoTitle || "",
    description:seoDescription || ""
  };
}

export default async function AllProduct(req) {
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
        <Header couponBanner={{}}/>
        <ProductDeatil productData={productData} />
        <div className={style.allDetailDisciptionContainer}>
          <ProductDiscription productData={productData} />
        </div>
        <ProductFaq productData={productData} />
        <ProductReview productData={productData} />
        <RelatedProducts productData={productData} />
        <Footer />
      </>}
      {(productData && Object.keys(productData).length == 0 && customHeader && Object.keys(customHeader).length !=0 )&& <PageNotFound productID={productID}/>}
    </div>
    </>
  )
}


