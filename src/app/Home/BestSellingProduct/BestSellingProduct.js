
import styles from './best-selling-product.module.scss';
import ProductSlider from './ProductSlider/ProductSlider';








const BestSellingProduct = ({}) => {
    

    const data = [
        {
          "id": 1001,
          "title": "AADAR BALD NO MORE Hair Capsule for Men ",
          "name": "AADAR BALD NO MORE Hair Capsule for Men ",
          "image": "https://dcngmd8umaj1u.cloudfront.net/1_1684934586079.jpg",
          "price": {
            "finalPrice": 345.00,
            "retailPrice": 4546.00,
            "discount": 4201.00,
            "currency": "AED",
            "discountType": "FIXED"
          }
        },
        {
            "id": 1001,
            "title": "AADAR BALD NO MORE Hair Capsule for Men ",
            "name": "AADAR BALD NO MORE Hair Capsule for Men ",
            "image": "https://dcngmd8umaj1u.cloudfront.net/1_1684934586079.jpg",
            "price": {
              "finalPrice": 345.00,
              "retailPrice": 4546.00,
              "discount": 4201.00,
              "currency": "AED",
              "discountType": "FIXED"
            }
          },
          {
            "id": 1001,
            "title": "AADAR BALD NO MORE Hair Capsule for Men ",
            "name": "AADAR BALD NO MORE Hair Capsule for Men ",
            "image": "https://dcngmd8umaj1u.cloudfront.net/1_1684934586079.jpg",
            "price": {
              "finalPrice": 345.00,
              "retailPrice": 4546.00,
              "discount": 4201.00,
              "currency": "AED",
              "discountType": "FIXED"
            }
          }
      ]

      const rr = {
        product : data,
        headerTitle:"Best Selling Product"
      }
    return(
        <div>

            <ProductSlider data={rr} headerTextStyle={{'textAlign':'center'}} />
        </div>
   
    )



}


export default BestSellingProduct;

  