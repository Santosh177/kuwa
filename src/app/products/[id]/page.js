
import ProductDeatil from "../component/productDetail/productDetail"
import ProductDiscription from "../component/productDiscription/productDiscription"
import ProductFaq from "../component/productFaq/productFaq"
import ProductReview from "../component/productReview/productReview"
import Footer from "@/components/Footer/Footer"
import Header from "@/components/Header/Header"
import style from "./page.module.scss"
import { authHeader } from "@/lib/auth-cookies"

export default async function AllProduct(req) {
  const productID = req && req.params && req.params.id  || "";
  const customHeader = await authHeader();
  const res = await fetch(`https://api.kuwa.bevaleo.dev/module/product-page/${productID}`, {
    headers: {...customHeader},
  });
  const productData = await res.json();
  return (
    <div className={style.productDetailContainerPage}>
      <Header/>
      {/* <div className={style.routeDetail} >Home / men's performance / product</div> */}
      <ProductDeatil productData={productData}/>
      <div className={style.allDetailDisciptionContainer}>
        <ProductDiscription productData={productData}/>
      </div>
        <ProductFaq productData={productData} />
        <ProductReview productData={productData} />
      <Footer/>
    </div>
  )
}
