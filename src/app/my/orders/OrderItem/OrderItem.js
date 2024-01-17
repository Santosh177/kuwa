
'use client';
import { useRouter } from 'next/navigation';
import StarRating from '../StarRating/StarRating';
import styles from './order-item.module.scss';

const MONTHS = ["Jan","Feb","Mar","April","May","Jun","July","Aug","Sep","Oct","Nov","Dec"]

const getDeliveryDate = (expDelivery) => {
    let expectedDelieryDate = new Date(expDelivery);
    let date = expectedDelieryDate.getDate();
    let month = MONTHS[ expectedDelieryDate.getMonth()];
    if(date && date.length == 1){
        date = "0"+date;
    }
    return date + " " +month;
}







export default  function OrderItem({data,index=0}) {
    const router = useRouter();

    console.log("orderData",data)
    
    const { orderId="",productName="",productImg="",orderStatus="",orderProductId="" , expDelivery="",productId="",rating="" } = data || {};


    const updateRating = async(rating) =>{
        let data = {
            productId:productId,
            rating: parseInt(rating) + 1
        }
        console.log("data",data)
        const updateRatingResp  =  await fetch(`/api/order-rating`, {
            method: 'POST',
            headers:{
              'Content-Type': 'application/json',
            },
            body:JSON.stringify(data),
            cache: 'no-store'
          })
          const updateRatingData = await updateRatingResp.json();
          router.refresh()
          console.log("updateRatingDataupdateRatingData",updateRatingData)
    }


    const renderOrderStatus = (orderStatus) => {
        switch (orderStatus) {
            // case "ORDER_IN_PROCESS":
            case "CREATED":
                return <div className={styles.status}>Order in process</div>
            case "SHIPPED":
                return <div className={styles.status}>On the way</div>
            case "FULFILLED":
                return <div className={styles.status}>Order delivered</div>
            case "CANCELED":
                return <div className={styles.orderCancelled}>Cancelled</div>
            default:
                return <div className={styles.status}>Order in process</div>
        }
    }


    const renderOrderInfo = (orderStatus) => {
        switch (orderStatus) {
            case "CREATED":
                return  <div className={styles.orderDeliveryTime}>Delivery expected by {getDeliveryDate(expDelivery)}</div>
            case "SHIPPED":
                return   <div className={styles.orderDeliveryTime}>Delivery expected by {getDeliveryDate(expDelivery)}</div>
            case "FULFILLED":
                return (
                    <div className={styles.orderInfoDelivered}>
                        <div className={styles.ratingTxt}>{(rating)?"You have rated !":"Rate the product based on your experience."}</div>
                        <StarRating onUpdateRating={updateRating} rating={rating} />
                    </div>
                
                )
            case "CANCELED":
                // return <div className={styles.orderInfoCancelled}>Refund Status : (false) <span className={styles.pending}>Pending</span>?<span className={styles.settled}>Settled</span></div>
            default:
                return <div className={styles.orderDeliveryTime}>Delivery expected by {getDeliveryDate(expDelivery)}</div>
        }
    }


   
    return (
      <>
            <div className={styles.orderItem} onClick={() => router.push(`/my/order/${orderId}`)}>
            <div className={styles.orderItemImage}>
                <img src={productImg} alt='product-img'/>
            </div>
            <div className={styles.orderItemInfo}>
                <div className={styles.orderItemStatus}>
                    {renderOrderStatus(orderStatus)}
                   {index===0 && <div className={styles.orderId}>Order ID : #{orderId}</div>}
                </div>
                <div className={styles.orderItemName}>{productName}</div>
                {renderOrderInfo(orderStatus)}
            </div>
        </div>
      </>
  
    )
  }