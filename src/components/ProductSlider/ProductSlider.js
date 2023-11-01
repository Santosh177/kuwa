'use client'
import React,{useState,useEffect} from 'react';
import { useRouter } from 'next/navigation';
import { addToCart } from '@/services'
import { useCartItems } from '@/context/cartItems';
import Loader from '../Loader/Loader';
import ProductCard from '@/components/ProductCard/ProductCard';
import styles from './product-slider.module.scss';
import Glider from 'react-glider';
import "glider-js/glider.min.css";

  const BACKGROUND_COLORS = [
    {
      "backgroundImage":"linear-gradient(180deg, #FCEEE0 0%, rgba(252, 238, 224, 0) 100%)",
      "backgroundColor":"#FCEEE0"
    },
    {
      "backgroundImage":"linear-gradient(180deg, #F2E9E7 0%, rgba(242, 233, 231, 0) 100%)",
      "backgroundColor":"#F2E9E7"
    },
    {
      "backgroundImage":"linear-gradient(180deg, #F1F4F9 0%, rgba(241, 244, 249, 0) 100%)",
      "backgroundColor":"#F1F4F9"
    },
    {
      "backgroundImage":"linear-gradient(180deg, #FBF4E6 0%, rgba(251, 244, 230, 0) 100%)",
      "backgroundColor":"#FBF4E6"
    },
    {
      "backgroundImage":"linear-gradient(180deg, #F6F3EF 0%, rgba(246, 243, 239, 0) 100%)",
      "backgroundColor":"#F6F3EF"
    },
    {
      "backgroundImage":"linear-gradient(180deg, #FFF3DE 0%, rgba(255, 243, 222, 0) 100%)",
      "backgroundColor":"#FFF3DE"
    },
    {
      "backgroundImage":"linear-gradient(180deg, #FEFBE2 0%, rgba(254, 251, 226, 0) 100%)",
      "backgroundColor":"#FEFBE"
    },
    {
      "backgroundImage":"linear-gradient(180deg, #F9E8E4 0%, rgba(249, 232, 228, 0) 100%)",
      "backgroundColor":"#F9E8E4"
    },
  ]



const createBackgroundColors = (totalRow= 14) => {
   let data = [];
   let tempCount = 0;
    for(let i=0; i<=14; i++){
      data.push(BACKGROUND_COLORS[tempCount]);
      if(tempCount < 7){
        tempCount=tempCount+1;
      }else{
        tempCount = 0
      }
    }
    return(data)

}

const ProductSlider = ({backgroundColor,topColor,design,data,headerTextStyle={},index=0,totalRow=14}) => {
  const router = useRouter();
  const { product=[],headerTitle= ""} = data || {};
  const [isLoading , setIsLoading] = useState(false);
  const { setCartItemData={},setCartItemCount={} } = useCartItems();
  const [ backgroundColors , setBackgroundColors] = useState(createBackgroundColors(totalRow));
  const [width, setWidth] = useState(0);
  const [isArrowVisible, setIsArrowVisible] = useState(false);
  const handleResize = () => setWidth(window.innerWidth);
  useEffect(() => {
    setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [width]);
  

  const onAddToCart = async(data) =>{
    try {
      setIsLoading(true)
      const res = await addToCart(data);
      setIsLoading(false)
      window.location.href = '/cart'
    } catch (error) {
      console.error('An unexpected error happened occurred:', error)
    }
}

//   const onAddToCart = async(data) =>{
//     try {
//       setIsLoading(true)
//       const addToCartResp = await fetch('/api/add-to-cart', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body:JSON.stringify(data)
//       })
//       const addToCartData = await addToCartResp.json();
//       console.log("addToCartData",addToCartData);
//       if(addToCartData && addToCartData['products'] && addToCartData['products'].length > 0){
//         setCartItemData(addToCartData['products']);
//         setCartItemCount(addToCartData['products'].length);
//         router.push('/cart')
//       }else{
//         setCartItemData([]);
//         setCartItemCount(0)
//       }
//       setIsLoading(false)
     
//     } catch (error) {
//       console.error('An unexpected error happened occurred:', error)
//     }
// }
    return (


          <>
          
          
          <div className={styles.sliderDecoration} style={{flexDirection:(index % 2 == 0)?'row-reverse':'row'}}>
            <div className={styles.sliderLine1} style={{background:backgroundColors[index].backgroundColor}}></div><div className={styles.sliderLine2} style={{background:backgroundColors[index].backgroundColor}}></div>
          </div>
          <div className={styles.container} style={{backgroundImage:backgroundColors[index].backgroundImage}}>
            <div className={styles.headerTxt} style={...headerTextStyle}>{headerTitle}</div>
            <div className={styles.sliderContainer}>
            <Glider
              hasArrows={(width>990)}
              slidesToShow={4.5}
              slidesToScroll={4}
              hasDots={(width>990)}
              draggable
              gap={20}
              exactWidth={true}
              itemWidth={(width>990)?204:138}
              iconLeft={
                <img style={{width:48,height:48}} src='https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/left_arrow.png' alt='left-icon'/>
              }
              iconRight={
                <img style={{width:48,height:48}}  src='https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/right_arrow.png' alt='right-icon'/>
              }
            >

              {
                product.map((data,index)=>{
                  const {finalPrice="", retailPrice="",currency="", discount="", discountType="" } = data && data.price ||  {}
                  const cardData = {
                    productName:data && data.name || "",
                    finalPrice:finalPrice,
                    retailPrice:retailPrice,
                    currency:currency,
                    discount:discount,
                    discountType:discountType,
                    image:data.image || "",
                    id: data.id || "",
                    seoUrl:data.seoUrl || ""
                  }
                  return(
                    <ProductCard  cardData={cardData} addToCart={()=>onAddToCart({product:data.id,quantity:1})} key={index}/>
                  )
                })
              }
                
               
            </Glider>
          
            </div>
          </div>
          <Loader isShow={isLoading} />
          </>
      );
    



}


export default ProductSlider;

  