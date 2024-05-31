import ProductSlider from './ProductSlider/ProductSlider';
import './best-selling-product.module.scss'








const BestSellingProduct = ({data}) => {
    
      const bestSellingProduct = {
        product : data,
        headerTitle:"Best Selling Product"
      }
    if(data && data.length > 0){
      return(
        <div>
            <ProductSlider data={bestSellingProduct} headerTextStyle={{'textAlign':'center'}} />
        </div>
    )
    }else{
      return null;
    }
   



}


export default BestSellingProduct;

  