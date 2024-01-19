'use client'
import { useRouter,usePathname } from 'next/navigation';
import OrderItem from '../OrderItem/OrderItem';
import OrderDeliveryStatus from '../OrderDeliveryStatus/OrderDeliveryStatus';
import OrderAddress from '../OrderAddress/OrderAddress';
import PriceDetails from '@/components/PriceDetails/PriceDetails';
import styles from './order-details.module.scss'

export default function OrderDetails({data}) {

  const router = useRouter()


  let { product = {}, orderId = "", price = {}, parentOrderId = "", billingAddress = {}, shippingAddress = {}, orderStatus = "", finalAmount = "", discount =0, currency = "", deliveryFee=0} = data || {};
  // const orderStatus = product['status']
  let address={}
      address["billingAddress"]=billingAddress;
      address["shippingAddress"]=shippingAddress

  let cartItemCount=0;
  let subTotal=0;
  let orderStatusSet = new Set();
  let cancelStatusSet = new Set();

  if (data && data.orderProducts && data.orderProducts.length > 0){
    data.orderProducts.map((product,index)=>{
      orderStatusSet.add(product.orderStatus)
      cancelStatusSet.add(product.orderStatus)
        cartItemCount++;
        subTotal += (product.productQuantity)*(product.productPriceSpecialAmount);
    })
  }
  {
    cancelStatusSet.delete("FULFILLED");
    cancelStatusSet.delete("DELIVERED");
    cancelStatusSet.delete("CANCELED");
  }
  {
    orderStatusSet.delete("CANCELED");
  }
  const priceDetailsData = {
    cartItemCount: cartItemCount,
    subTotal: (subTotal),
    totalAmount: finalAmount,
    savedAmount:(price['total']- price['deliveryFee']),
    discountAmount: discount,
    currency:currency,
    deliveryFees: deliveryFee
  }

  let disableCancelBtn = false;
  let cancelStatement=""
  if (orderStatusSet) {
    if (orderStatusSet.has("CREATED")){
      orderStatus="CREATED";
      cancelStatement=""
    }
    else if (orderStatusSet.has("FULFILLED")){
      cancelStatement ="Order has been dispatched cannot be cancelled"
      orderStatus = "FULFILLED";
    }
    else if (orderStatusSet.has("DELIVERED")){
      orderStatus = "DELIVERED";
      cancelStatement ="Order has been delivered cannot be cancelled"
    }
  }
  if (cancelStatusSet.size<=0){
    disableCancelBtn=true;
   }
  const handleCancelButton = () => {
    if (disableCancelBtn) {
    }
    else {
      window.location.href = `/my/order/cancellation-request/${orderId}`
    }
  }

  let disableStyle = {}
  if (disableCancelBtn) {
    disableStyle = {
      border: " 1px solid #CECECE",
      background: "#FFF",
      cursor: "not-allowed",
      color:"#CECECE"
    }
  }

  return (
    <div className={styles.orderDetails}>
        <div className={styles.orderDetailsLeftContainer}>
        <div className={styles.orderId}>Order ID : #{orderId}</div>
        {data && data.orderProducts && data.orderProducts.length > 0 && data.orderProducts.map((item,index)=>(
          <OrderItem product={item} orderId={parentOrderId} currency={data['currency']}/>

        ))
         }
            <OrderDeliveryStatus  orderStatus={orderStatus}/>
            <OrderAddress address={address} />
        </div>
        <div className={styles.orderDetailsRightContainer}>
            <PriceDetails data={priceDetailsData} isHidePriceDetails={false} />
            <div className={styles.needHelpTxt} onClick={()=>router.push('/contact-us')}>Need help ? <span>Contact Us</span></div>
        {disableCancelBtn && <div className={styles.cancelError}>{cancelStatement}</div>}
        <div className={styles.cancelOrderBtn} style={disableStyle} onClick={() => handleCancelButton()}>Cancel my order</div>
        </div>
      
        
    </div>

  )
}

