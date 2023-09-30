
import ProductDeatil from "../component/productDetail/productDetail"
import ProductDiscription from "../component/productDiscription/productDiscription"
import ProductFaq from "../component/productFaq/productFaq"
import ProductReview from "../component/productReview/productReview"
import Footer from "@/components/Footer/Footer"
import Header from "@/components/Header/Header"
import style from "./page.module.scss"
import { authHeader } from "@/lib/auth-cookies"
import RelatedProducts from "../component/RelatedProducts/reletedProducts"

export default async function AllProduct(req) {
  const productID = req && req.params && req.params.id || "";
  const customHeader = await authHeader();
  console.log("customHeader",customHeader)
  const res = await fetch(`${process.env.BACKEND_END_POINT_URL}/module/product-page/seo/${productID}`, {
    headers: { ...customHeader },
  });
  const productData = await res.json();

  console.log("productDataproductData",productData)


  return (
    <div className={style.productDetailContainerPage}>
      <Header couponBanner={{}}/>
      {/* <div className={style.routeDetail} >Home / men's performance / product</div> */}
      <ProductDeatil productData={productData} />
      <div className={style.allDetailDisciptionContainer}>
        <ProductDiscription productData={productData} />
      </div>
      <ProductFaq productData={productData} />
      <ProductReview productData={productData} />
      <RelatedProducts productData={productData} />
      <Footer />
    </div>
  )
}


