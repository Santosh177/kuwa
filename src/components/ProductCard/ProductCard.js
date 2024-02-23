import { useRouter } from 'next/navigation';
import styles from './product-card.module.scss';
import NotifySuccessPopup from '../NotifySuccessPopup/NotifySuccessPopup';
import { useState } from 'react';



const ProductCard = ({cardData,addToCart={},style={}}) => {

    const [isShowNotifySuccessPop,setIsShowNotifySuccessPop] = useState(false);

    const handleNotify = async()=>{

        const payload = {
            productId:"",
            variantId:"",
            deviceId:"",
            email:"",
            userId:""
        }

        // const res = await fetch(`${process.env.BACKEND_END_POINT_URL}/out-of-stock/email`,{
        //     method: 'GET',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        // })
        setIsShowNotifySuccessPop(true)
       
    }
   
    const router = useRouter();
    const { productName="", finalPrice="" , retailPrice="", currency="", discount="", image="",id="" , seoUrl="",normalInventory=0} = cardData || {}
    const btnName = normalInventory > 0 ? "Add to cart" : "Notify me"
    return(
        <>
        <div className={styles.productCardItem} onClick={()=>window.location.href=`/products/`+seoUrl}>
            <div className={styles.productCardWrapper} style={{...style}}>
                <div className={styles.productImgWrapper}>
                    <div className={styles.productImgContainer}>
                        <img className={styles.productImg} src={image} alt='product-name' />
                    </div>
                </div>
                <div className={styles.textContent}>
                <div className={styles.productName}>{productName}</div>
               {  <div className={styles.discountTag} style={(discount > 0)?{opacity:1}:{opacity:0}}><span>Save</span> {currency} {discount}</div>}
                {(discount > 0)?<div className={styles.price}>{currency} {finalPrice}  <span className={[styles.price,styles.retailPrice].join(" ")}>{currency} {retailPrice}</span></div>:<div className={styles.price}>{currency} {finalPrice} </div>}
                <div className={styles.btn} onClick={(e)=>
                    {
                        e.stopPropagation()
                        if(normalInventory> 0){
                            addToCart();
                        }
                        else{
                            handleNotify();
                        }
                        }}>{btnName}</div>
            </div>
            </div>
        </div>
        
       {isShowNotifySuccessPop &&
       <div className={styles.popUp}> <NotifySuccessPopup/></div>
       }
        </>
    )



}


export default ProductCard;

  