import StarRating from '../StarRating/StarRating';
import styles from './order-item.module.scss';







export default  function OrderItem({}) {


    const renderOrderStatus = (orderStatus) => {
        switch (orderStatus) {
            case "ORDER_IN_PROCESS":
                return <div className={styles.status}>Order in process</div>
            case "ON_THE_WAY":
                return <div className={styles.status}>On the way</div>
            case "ORDER_DELIVERED":
                return <div className={styles.status}>Order delivered</div>
            case "ORDER_CANCELLED":
                return <div className={styles.orderCancelled}>Cancelled</div>
            default:
                return <div className={styles.status}>Order in process</div>
        }
    }


    const renderOrderInfo = (orderStatus) => {
        switch (orderStatus) {
            case "ORDER_IN_PROCESS":
                return  <div className={styles.orderDeliveryTime}>Delivery expected by 24 April</div>
            case "ON_THE_WAY":
                return   <div className={styles.orderDeliveryTime}>Delivery expected by 24 April</div>
            case "ORDER_DELIVERED":
                return (
                    <div className={styles.orderInfoDelivered}>
                        <div className={styles.ratingTxt}>Rate the product based on your experience.</div>
                        <StarRating />
                    </div>
                
                )
            case "ORDER_CANCELLED":
                return <div className={styles.orderInfoCancelled}>Refund Status : (false) <span className={styles.pending}>Pending</span>?<span className={styles.settled}>Settled</span></div>
            default:
                return <div className={styles.status}>Order in process</div>
        }
    }


    return (
      <>
        <div className={styles.orderItem}>
            <div className={styles.orderItemImage}>
                <img src='https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/image+74+(1).png' alt='product-img'/>
            </div>
            <div className={styles.orderItemInfo}>
                <div className={styles.orderItemStatus}>
                    {renderOrderStatus("ORDER_CANCELLED")}
                    <div className={styles.orderId}>Order ID : #5433</div>
                </div>
                <div className={styles.orderItemName}>Korean Marine Collagen Peptides, 200 Gms</div>
                {renderOrderInfo("ORDER_DELIVERED")}
            </div>
        </div>
      </>
  
    )
  }