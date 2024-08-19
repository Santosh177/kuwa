'use client'
import React,{useState,useEffect} from 'react';
import { useRouter } from 'next/navigation';
import { addToCart,addGoogleEvent } from '@/services'
import { useCartItems } from '@/context/cartItems';
import Loader from '../Loader/Loader';
// import ProductCard from '@/app/[lng]/components/ProductCard/ProductCard';
import ProductCard from '../ProductCard/ProductCard';
import styles from './product-slider.module.scss';
import Glider from 'react-glider';
import "glider-js/glider.min.css";
import useCleverTapEvents from '@/hooks/useCleverTapEvents';
import NotifySuccessPopup from '../NotifySuccessPopup/NotifySuccessPopup';
import NotifyEmailPopup from '../NotifyEmailPopup/NotifyEmailPopup';
import { useAuth } from '@/context/userDetail';
// import { mixPanelTrackEvent } from '../../app/[lng]/page';
import { mixPanelTrackEvent } from '../../page';
import { useLanguage } from '@/context/languageDetails';


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
  const { product=[],headerTitle= "",headerTitleArabic="",seoUrl} = data || {};
  const [isLoading , setIsLoading] = useState(false);
  const { setCartItemData={},setCartItemCount={} } = useCartItems();
  const [ backgroundColors , setBackgroundColors] = useState(createBackgroundColors(totalRow));
  const [width, setWidth] = useState(0);
  const [isArrowVisible, setIsArrowVisible] = useState(false);
  const [isShowNotifySuccessPopup, setIsShowNotifySuccessPopup] = useState(false);
  const [isShowNotifyEmailPopup, setIsShowNotifyEmailPopup] = useState(false);
  const [emailId,setEmailId] = useState("")
  const [nonloginProductId,setNonLoginProductId] = useState("");
  const [nonLoginVariantId,setNonLoginVariantId] = useState("");

  const clevertapEvent = useCleverTapEvents();
  const handleResize = () => setWidth(window.innerWidth);

  const { isLogin=false ,userData = {}} = useAuth();
  const emailAddress = userData && userData.emailAddress;
  const {listOfLanguages , selectedLanguage, isArabic, isEnglish, changeLanguage={}} = useLanguage();

  
  useEffect(() => {
    setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [width]);

  
let trackData={};
  const onAddToCart = async(data) =>{
    const trackingData = {
      "product Name": data.productName,
      "quantity": 1,
      "product Id":data.product,
      "Page URL":window.location.href,
      "Screen":"Home"
    }
    try {
      setIsLoading(true)
      const res = await addToCart(data);
      addGoogleEvent(trackingData)
      setIsLoading(false)
      clevertapEvent.onCleverTapEvent("kuwa_add_to_cart",trackData);
      if(isLogin){
        mixPanelTrackEvent("kuwa_add_to_cart",trackingData,userData.id )
       }
       else{
        mixPanelTrackEvent("kuwa_add_to_cart",trackingData )
       }  
      window.location.href = '/cart'
    } catch (error) {
      console.error('An unexpected error happened occurred:', error)
    }
}

const handleAllProduct = () =>{
  const encodedSeoUrl = encodeURIComponent(seoUrl);
  window.location.href = `/collections/${encodedSeoUrl}`
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
          
          
          {/* <div className={styles.sliderDecoration} style={{flexDirection:(index % 2 == 0)?'row-reverse':'row'}}>
            <div className={styles.sliderLine1} style={{background:backgroundColors[index].backgroundColor}}></div><div className={styles.sliderLine2} style={{background:backgroundColors[index].backgroundColor}}></div>
          </div> */}
          <div className={styles.container} style={{backgroundImage:backgroundColors[index].backgroundImage}}>
          <div className={styles.headerContainer}>
            <div className={styles.headerTxt} style={{...headerTextStyle}}>{isArabic ? headerTitleArabic:headerTitle}</div>
            <div className={`${styles.seeAllDiv} ${isArabic ? styles['seeAllDiv-ar'] : styles['seeAllDiv-en']}` } onClick={handleAllProduct}>
          <div className={styles.txt}>{isArabic ? "اعرض المزيد " : "See all"}</div>
          <div className={`${styles.arrowImg} ${isArabic ? styles['arrowImg-ar'] : ''}`}><img src='https://d25uasl7utydze.cloudfront.net/assets/right%20arrow.svg'/></div>
          </div>
          </div>
          <div className={styles.sliderContainer}>
            <Glider
              hasArrows={(width>990)}
              slidesToShow={4.5}
              slidesToScroll={7}
              hasDots={false}
              draggable
              gap={20}
              exactWidth={true}
              itemWidth={(width>990)?204:138}
              iconLeft={
                <img style={{width:38,height:64,}} src='https://d25uasl7utydze.cloudfront.net/assets/left.png' alt='left-icon'/>
              }
              iconRight={
                <img style={{width:38,height:64,}}  src='https://d25uasl7utydze.cloudfront.net/assets/right.png' alt='right-icon'/>
              }
            >

              {
                product.slice(0, 12).map((data,index)=>{
                  const {
                    image= "",
                    id= "",
                    title="",
                    name= "",
                    nameArabic= "",
                    countDownStartsAt="",
                    countDownEndsAt="",
                    dealId="",
                    dealListPrice="",
                    dealDiscountPrice="",
                    dealFinalPrice= "",
                    dealInventory="",
                    rank="",
                    seoUrl="",
                    productListPrice= "",
                    productFinalPrice = "",
                    productDiscount = "",
                    normalInventory = "",
                    variantName = "",
                    variantImage = "",
                    variantListPrice = "",
                    variantFinalPrice = "",
                    variantDiscount = "",
                    isDealActive="",
                    isTimerActive="",
                    dealTag="",
                    dealIconUrl="",
                    currentTimerStatus="",
                    currentTimerValue="",
                    currentDateTime=""} = data || {}
                  const { variants=[]} = data  || {};
                 const variantId= data.variants[0]?.variantPrices[0]?.variantId || ""
                  const {finalPrice="", retailPrice="",currency="", discount="", discountType="" } = data && data.price ||  {}
                  let cardData = {
                  }
                  trackData = {
                    "product Name": data && data.name || "",
                    "quantity": 1,
                    "product Id":data.id || "",
                    "Page URL":window.location.href,
                    "Screen":"Home"
                  }
                 
                    if(variants && variants.length > 0 && data.variants[0].variantPrices.length>0)
                    
                    {
                      if(data.variants[0].variantPrices[0].dealId
                        && data.variants[0].variantPrices[0].isDealActive
                        && data.variants[0].variantPrices[0].isTimerActive
                        && data.variants[0].variantPrices[0].currentTimerStatus == "in-between"
                        ){
                          const { variantPrices = [] ,name="",image=""} = data.variants[0] || {};
                        cardData = {
                          dealId:variantPrices[0].dealId,
                          productName: data && data.name || "",
                          dealFinalPrice: variantPrices[0].dealFinalPrice,
                          dealListPrice: variantPrices[0].dealListPrice,
                          currency: currency,
                          dealDiscountPrice: variantPrices[0].dealDiscountPrice,
                          discountType: discountType || "",
                          image: image || "",
                          variantId: variantPrices[0].variantId || "",
                          seoUrl: data.seoUrl || "",
                          isDealActive:variantPrices[0].isDealActive,
                          isTimerActive:variantPrices[0].isTimerActive,
                          currentTimerStatus:variantPrices[0].currentTimerStatus,
                          currentTimerValue:variantPrices[0].currentTimerValue,
                          tag:variantPrices[0].dealTag,
                          tagIconUrl:variantPrices[0].dealIconUrl,
                          normalInventory:data.variants[0].quantity,
                        productNameArabic: data && data.nameArabic || "",


                        }
                    }
                    else
                    {
                      const { variantPrices = [] ,name="",image=""} = data.variants[0] || {};
                      cardData = {
                        productName: data && data.name || "",
                        finalPrice: variantPrices[0].finalPrice,
                        retailPrice: variantPrices[0].retailPrice,
                        currency: currency,
                        discount: variantPrices[0].discount,
                        discountType: discountType || "",
                        image: image || "",
                        variantId: variantPrices[0].variantId || "",
                        seoUrl: data.seoUrl || "",
                        normalInventory:data.variants[0].quantity,
                        productNameArabic: data && data.nameArabic || "",
                      }
                   }
                  }

                 else{

                    if(dealId &&
                      isDealActive && isTimerActive
                      &&  currentTimerStatus == "in-between"
                    ) {

                      cardData={
                        "dealId":dealId || "",
                        "productId":id || "",
                        "productName":name,
                        "productNameArabic":nameArabic,
                        "productImage":image || "",
                        "seoUrl":seoUrl || "",
                        "dealListPrice":dealListPrice,
                        'dealFinalPrice':dealFinalPrice,
                        'discountType':"fixed",
                        "dealDiscountPrice":dealDiscountPrice || 0,
                        "currency":currency,
                        "tag":dealTag,
                        "tagIconUrl":dealIconUrl,
                        "dealInventory":dealInventory,
                        "isDealActive":isDealActive,
                        "isTimerActive":isTimerActive,
                        "currentTimerStatus":currentTimerStatus,
                        "currentTimerValue":currentTimerValue,
                        "currentDateTime":currentDateTime,
                        "normalInventory":data.normalQuantity
                      }
                     }else{
                      cardData = {
                        productName: data && data.name || "",
                        finalPrice: finalPrice,
                        retailPrice: retailPrice,
                        currency: currency,
                        discount: discount,
                        discountType: discountType,
                        image: data.image || "",
                        productId: data.id || "",
                        seoUrl: data.seoUrl || "",
                        normalInventory:data.normalQuantity,
                        productNameArabic: data && data.nameArabic || "",
                      }
                    }
                  }
                 
                  let addToCartPayload = {}
                  if(variants && variants.length > 0){
                    const { variantPrices = [] ,name="",image="",id=""} = data.variants[0] || {};
                    let variantId ;
                    let variantDealPrice = "";
                    let variantDealId = ''
                    if(variantPrices && variantPrices.length > 0){
                      variantId = variantPrices[0].variantId;
                      variantDealPrice = variantPrices[0].dealFinalPrice;
                      variantDealId = variantPrices[0].dealId;
                    }
                    if( variantPrices[0]?.dealId &&  variantPrices[0]?.isDealActive && variantPrices[0]?.isTimerActive
                        && variantPrices[0].currentTimerStatus == "in-between"
                     ){
                    addToCartPayload= {"product":data.id,"quantity":1,"isVariant":variantId? true : false,"variantId":variantId,dealId:variantDealId,dealPrice:variantDealPrice,productName:data.name}

                    }
                    else{
                    addToCartPayload= {"product":data.id,"quantity":1,"isVariant":variantId? true : false,"variantId":variantId,productName:data.name}
                    }
 
                  }
                  else{
                    if(dealId && isDealActive && isTimerActive  &&  currentTimerStatus == "in-between" ){
                    addToCartPayload = { product: data.id, quantity: 1,dealId:dealId ,dealPrice:dealFinalPrice,productName:data.name}

                    }
                    else{
                    addToCartPayload = { product: data.id, quantity: 1,productName:data.name}
                      }
                  }
                  return(
                    <ProductCard  cardData={cardData} addToCart={()=>onAddToCart(addToCartPayload)} key={index} handleNotifyMe={()=>handleNotifyMe(id,variantId)} handleNonLogin={()=>handleNonLogin(id,variantId)}  />
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
      );
    



}


export default ProductSlider;

  