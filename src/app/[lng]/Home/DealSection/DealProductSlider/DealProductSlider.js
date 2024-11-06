import React,{useState,useEffect} from 'react'
import { useRouter } from 'next/navigation';
import ProductDealCard from '@/app/[lng]/components/ProductDealCard/ProductDealCard';
import { addToCart,addGoogleEvent } from '@/services'
import { useCartItems } from '@/context/cartItems';
import Glider from 'react-glider';
import Loader from '@/app/[lng]/components/Loader/Loader';
import "glider-js/glider.min.css";
import useCleverTapEvents from '@/hooks/useCleverTapEvents';
import styles from './deal-product-slider.module.scss'
import NotifyEmailPopup from '@/app/[lng]/components/NotifyEmailPopup/NotifyEmailPopup';
import NotifySuccessPopup from '@/app/[lng]/components/NotifySuccessPopup/NotifySuccessPopup';
import { useAuth } from '@/context/userDetail';
import { mixPanelTrackEvent } from '../../../../[lng]/page';

const DealProductSlider = ({data,tagIconUrl,tag,isDealActive,isTimerActive,currentTimeStatus,tagArabic}) => {
console.log("DEAL PRODUCT SLIDER")
    const [isLoading , setIsLoading] = useState(false);
    const [width, setWidth] = useState(0);
    const [isShowNotifySuccessPopup, setIsShowNotifySuccessPopup] = useState(false);
    const [isShowNotifyEmailPopup, setIsShowNotifyEmailPopup] = useState(false);
    const [emailId,setEmailId] = useState("")
    const [nonloginProductId,setNonLoginProductId] = useState("");
    const [nonLoginVariantId,setNonLoginVariantId] = useState("");

    const clevertapEvent = useCleverTapEvents();
    const handleResize = () => setWidth(window.innerWidth);
    useEffect(() => {
      setWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, [width]);
    let trackData={};
    const { isLogin=false ,userData = {}} = useAuth();
    const emailAddress = userData && userData.emailAddress;
  const onAddToCart = async(data) =>{
    // const trackingData = {
    //   "product Name": data.productName,
    //   "quantity": 1,
    //   "product Id":data.product,
    //   "Page URL":window.location.href,
    //   "Screen":"Home"
    // }
    try {
      setIsLoading(true)
      const res = await addToCart(data);
      addGoogleEvent(trackData)
      setIsLoading(false)
      clevertapEvent.onCleverTapEvent("kuwa_add_to_cart",trackData);  
      if(isLogin){
        mixPanelTrackEvent("kuwa_add_to_cart",trackData,userData.id )
       }
       else{
        mixPanelTrackEvent("kuwa_add_to_cart",trackData )
       }
      window.location.href = '/cart'
    } catch (error) {
      console.error('An unexpected error happened occurred:', error)
    }
}


const handleNonLogin = (id,variantId)=>{
  console.log("id, variantId", id, variantId);
   setIsShowNotifyEmailPopup(true);
   setNonLoginProductId(id);
   setNonLoginVariantId(variantId);
}

const handleNotify = async() =>{
  const payload={
       productId:nonloginProductId|| null,
       variantId:nonLoginVariantId || null,
       email: emailId 
     }
     try {
      setIsLoading(true)
       const res = await fetch(`/api/out-of-stock`, {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
         },
         body: JSON.stringify(payload),
       });
       if(res.status == 200){
        setIsLoading(false)
         setIsShowNotifySuccessPopup(true);
       }
       else{
        setIsLoading(false)
        console.log(error)
       }
       
       
     } catch (error) {
      setIsLoading(false)
       console.error('Error:', error);
     }
   }

   const handleNotifyMe = async(productId, variantId)=>{
    console.log("variantId",variantId)
    const payload={
      productId:productId || null,
      variantId:variantId || null,
      email: emailAddress 
    }
    try {
      setIsLoading(true)
      const res = await fetch(`/api/out-of-stock`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      if(res.status == 200){
        setIsLoading(false)
        setIsShowNotifySuccessPopup(true);
      }
      else{
        setIsLoading(true)
        console.log(error)
      }
     
      
    } catch (error) {
      setIsLoading(false)
      console.error('Error:', error);
    }
  }
  return (
    <>
       <div className={styles.container}>
       <div className={styles.sliderContainer}>
        <Glider
         hasArrows={(width>990)}
         slidesToShow={4.5}
         slidesToScroll={7}
        //  hasDots={width > 990}
         draggable
         gap={20}
         exactWidth={true}
         itemWidth={(width > 990) ? 204 : 138}
         iconLeft={
           <img style={{ width: 38, height: 64, }} src='https://d25uasl7utydze.cloudfront.net/assets/left.png' alt='left-icon' />
         }
         iconRight={
           <img style={{ width: 38, height: 64, }} src='https://d25uasl7utydze.cloudfront.net/assets/right.png' alt='right-icon' />
         }
         >
         {
              data.slice(0, 12).map((data, index) => {
                const {productId,variantId} = data || {}
                let cardData = {}
                trackData = {
                    "product Name": data && data.productName || "",
                    "quantity": 1,
                    "product Id":data.productId || "",
                    "Page URL":window.location.href,
                    "Screen":"Home"
                  }
                if(variantId==null){
                    cardData = {
                      dealId : data.dealId || "",
                        productName: data && data.productName || "",
                        finalPrice: data.productFinalPrice,
                        retailPrice: data.productListPrice,
                        dealListPrice:data.dealListPrice,
                        dealDiscountPrice:data.dealDiscountPrice,
                        dealFinalPrice:data.dealFinalPrice,
                        currency: data.currency,
                        discount: data.productDiscount,
                        dealDiscountPrice:data.dealDiscountPrice,
                        // discountType: discountType,
                        image: data?.productImageUrl || "",
                        id: data?.productId || "",
                        seoUrl: data?.productSeoUrl || "",
                        dealInventory:data?.dealInventory,
                        normalInventory:data?.normalInventory,
                        tag:tag || "",
                        tagIconUrl:tagIconUrl || "",
                        isDealActive:isDealActive,
                        isTimerActive:isTimerActive,
                        currentTimerStatus:currentTimeStatus,
                        tagArabic: tagArabic,
                        productNameArabic: data?.productNameArabic,
                        isProductBestSeller: data?.isProductBestSeller
                      }
                }else{
                    cardData = {
                      dealId : data.dealId || "",
                      productName: data && data.productName || "",
                      finalPrice: data.variantFinalPrice,
                      retailPrice: data.variantListPrice,
                      currency: data.currency,
                      discount: data.variantDiscount,
                    //   discountType: discountType,
                      image: data?.variantImage || "",
                      id: data?.variantId || "",
                      seoUrl: data?.productSeoUrl || "",
                      dealListPrice:data.dealListPrice,
                      dealDiscountPrice:data.dealDiscountPrice,
                      dealFinalPrice:data.dealFinalPrice,
                      dealInventory:data?.dealInventory,
                      normalInventory:data?.normalInventory,
                      tag:tag || "",
                      tagIconUrl:tagIconUrl || "",
                      isDealActive:isDealActive || false,
                      isTimerActive:isTimerActive,
                      currentTimerStatus:currentTimeStatus,
                      tagArabic:tagArabic,
                      productNameArabic: data?.productNameArabic,
                      isProductBestSeller: data?.isProductBestSeller


                    }
                }

                let addToCartPayload = {}
                if(variantId ){
                  if(isDealActive && isTimerActive && currentTimeStatus== "in-between"){
                    addToCartPayload = {"product":data.productId,"quantity":1,"isVariant":true,"variantId":data.variantId,"dealId":data.dealId,"dealPrice":data.dealFinalPrice,productName:data.productName}    
                  }
                  else{
                    addToCartPayload = {"product":data.productId,"quantity":1,"isVariant":true,"variantId":data.variantId,productName:data.productName}    
                  }
                   
                }
                else{
                  if(isDealActive && isTimerActive && currentTimeStatus== "in-between"){
                    addToCartPayload =  { "product": data.productId, quantity: 1, "dealId" :data.dealId ,"dealPrice":data.dealFinalPrice,productName:data.productName}
                  }
                  else{
                    addToCartPayload =  { "product": data.productId, quantity: 1,productName:data.productName}
                  }


                }
               
                return (
                    <ProductDealCard key={index} cardData={cardData}  addToCart={()=>onAddToCart(addToCartPayload)}  handleNotifyMe={()=>handleNotifyMe(productId,variantId)} handleNonLogin={()=>handleNonLogin(productId,variantId)} />
                )
            })
         }
         </Glider>
        
    </div>
       </div>
       <div className={styles.NotifySuccessPopup}>{isShowNotifySuccessPopup && <NotifySuccessPopup setIsShowNotifySuccessPopup={setIsShowNotifySuccessPopup}/>}</div>
          <div>{isShowNotifyEmailPopup && <NotifyEmailPopup setIsShowNotifyEmailPopup={setIsShowNotifyEmailPopup} setIsShowNotifySuccessPopup={setIsShowNotifySuccessPopup}  emailId={emailId} setEmailId={setEmailId} handleNotify={handleNotify}/>}</div>
         <Loader isShow={isLoading} />
    </>
 
    
  )
}

export default DealProductSlider