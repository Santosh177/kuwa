'use client'
import React,{useState, useEffect} from 'react';
import { useRouter } from 'next/navigation';
import ProductCard from '@/app/[lng]/components/ProductCard/ProductCard';
import { addToCart, addGoogleEvent } from '@/services'
import { useCartItems } from '@/context/cartItems';
import styles from './product-slider.module.scss';
import Glider from 'react-glider';
import Loader from '@/app/[lng]/components/Loader/Loader';
import "glider-js/glider.min.css";
import useCleverTapEvents from '@/hooks/useCleverTapEvents';
import { mappingDealProducts } from '@/services';
import NotifyEmailPopup from '@/app/[lng]/components/NotifyEmailPopup/NotifyEmailPopup';
import NotifySuccessPopup from '@/app/[lng]/components/NotifySuccessPopup/NotifySuccessPopup';
import { useAuth } from '@/context/userDetail';
import { mixPanelTrackEvent } from '../../../../[lng]/page';
import { useLanguage } from '@/context/languageDetails';

const ProductSlider = ({data}) => {
    const router = useRouter();
    const { product = [], headerTitle = "" } = data || {};
    const [isLoading, setIsLoading] = useState(false);
    const { setCartItemData={},setCartItemCount={} } = useCartItems();
    const [width, setWidth] = useState(0);
    const [isArrowVisible, setIsArrowVisible] = useState(false);

    const [emailId,setEmailId] = useState("")
    const [nonloginProductId,setNonLoginProductId] = useState("");
    const [nonLoginVariantId,setNonLoginVariantId] = useState("");
    const [isShowNotifySuccessPopup, setIsShowNotifySuccessPopup] = useState(false);
    const [isShowNotifyEmailPopup, setIsShowNotifyEmailPopup] = useState(false);

    const { isLogin=false ,userData = {}} = useAuth();
    const emailAddress = userData && userData.emailAddress;

    const clevertapEvent = useCleverTapEvents();
    const handleResize = () => setWidth(window.innerWidth);
    const headerTitleupdate = headerTitle.split(" ");
    const firstWordHeder = headerTitleupdate[0]
  const {listOfLanguages , selectedLanguage, isArabic, isEnglish, changeLanguage={}} = useLanguage();


    useEffect(() => {
      setWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, [width]);

    let trackData={};

    const onAddToCart = async(data) =>{
      // const trackingData = {
      //   "product Name": data.productName,
      //   "quantity": 1,
      //   "product Id":data.product,
      //   "Page URL":window.location.href,
      //   "Screen":"Home"
      // }
        try{
            setIsLoading(true);
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
           
            window.location.href =  '/cart';
        }
        catch (error){
            console.error('An unexpected error happened occurred:', error)
        }
    }
    const handleAllProduct = () =>{
      window.location.href = '/collections?category=&sort=new_arrivals'
    }

    const handleNonLogin = (id,variantId)=>{
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
    {product && product.length > 0 && 
    <div className={styles.container}>
      <div className={styles.headerContainer}>
          <div className={styles.headerTxt} ><span>{firstWordHeder}</span> {headerTitleupdate.slice(1).join(" ") }</div>
    <div className={`${styles.seeAllDiv} ${isArabic ? styles['seeAllDiv-ar'] : styles['seeAllDiv-en']}` } onClick={handleAllProduct}>
      <div className={styles.txt}>{isArabic ? "اعرض المزيد ": "See all"}</div>
      <div className={`${styles.arrowImg} ${isArabic ? styles['arrowImg-ar'] : ''}`}><img src='https://d25uasl7utydze.cloudfront.net/assets/right%20arrow.svg'/></div>
    </div>
    </div>
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
              product.map((data, index) => {
                const cardData = mappingDealProducts(data);
                const productName = cardData.productName || ""
                const productId = cardData.productId || ""
                const dealPrice = cardData.dealFinalPrice || ""
                const dealId = cardData.dealId || null
                trackData = {
                  "product Name": productName,
                  "quantity": 1,
                  "product Id":productId,
                  "Page URL":window.location.href,
                  "Screen":"Home"
                }
                return (
                    <ProductCard key={index} cardData={cardData} addToCart={() => onAddToCart({ product:productId, quantity: 1 ,dealPrice,dealId,productName})} handleNotifyMe={()=>handleNotifyMe(productId)} handleNonLogin={()=>handleNonLogin(productId)} />
                )
            })
         }
         </Glider>
         <div className={styles.NotifySuccessPopup}>{isShowNotifySuccessPopup && <NotifySuccessPopup setIsShowNotifySuccessPopup={setIsShowNotifySuccessPopup}/>}</div>
          <div>{isShowNotifyEmailPopup && <NotifyEmailPopup setIsShowNotifyEmailPopup={setIsShowNotifyEmailPopup} setIsShowNotifySuccessPopup={setIsShowNotifySuccessPopup}  emailId={emailId} setEmailId={setEmailId} handleNotify={handleNotify}/>}</div>
         <Loader isShow={isLoading} />
    </div>
    </div>}
    </>
  )
}

export default ProductSlider