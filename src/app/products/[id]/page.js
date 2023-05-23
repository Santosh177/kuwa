import ProductDeatil from "../component/productDetail/productDetail"
import ProductDiscription from "../component/productDiscription/productDiscription"
import ProductFaq from "../component/productFaq/productFaq"
import ProductReview from "../component/productReview/productReview"
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
      <ProductDeatil productData={productData} />
      <div className={style.allDetailDisciptionContainer}>
        <ProductDiscription productData={productData} />
        <ProductFaq productData={productData} />
        <ProductReview productData={productData} />
      </div>
    </div>
  )
}
