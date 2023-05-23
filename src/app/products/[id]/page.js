
import ProductDeatil from "../component/productDetail/productDetail"
import ProductDiscription from "../component/productDiscription/productDiscription"
import ProductFaq from "../component/productFaq/productFaq"
import ProductReview from "../component/productReview/productReview"
import Footer from "@/components/Footer/Footer"
import Header from "@/components/Header/Header"
import style from "./page.module.scss"

export default async function AllProduct() {
  const res = await fetch('https://api.kuwa.bevaleo.dev/module/product-page/1?country=1', {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const productData = await res.json();

  return (
    <div className={style.productDetailContainerPage}>
      <Header/>
      <div className={style.routeDetail} >Home / men's performance / product</div>
      <ProductDeatil productData={productData}/>
      <div className={style.allDetailDisciptionContainer}>
        <ProductDiscription productData={productData}/>
        <ProductFaq productData={productData} />
        <ProductReview productData={productData} />
      </div>
      <Footer/>
    </div>
  )
}
