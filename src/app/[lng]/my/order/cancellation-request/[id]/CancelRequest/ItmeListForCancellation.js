'use client'
import React, { useEffect, useState } from 'react'
import OrderItemList from './OrderItemList';
// import OrderItemList from './OrderItemList';
import styles from './order-item-list.module.scss';
import { useParams } from 'next/navigation';

const ItmeListForCancellation = ({setPayloadData, payloadData=[] })=> {
    const [listOfMyOrder, setListOfMyOrder] = useState({});
    const [productsData, setProductsData] = useState({});
    const [isCheckedAll,setIsCheckedAll]=useState(false);
    const params = useParams();
    const orderId = params.id
    useEffect(() => {
       const fetchData=async ()=>{
           try {
               
            //    const customHeader = await authHeader();
               const orderDetailsResp = await fetch(`${process.env.BACKEND_END_POINT_URL}/api/v1/order-summary/${orderId}`, {
                   method: 'GET',
                //    headers: {
                //        ...customHeader
                //    },
                //    cache: 'no-store'
               })
               const orderDetailData = await orderDetailsResp.json();
               let dummyOrderProducts = orderDetailData.orderProducts||[]
               dummyOrderProducts = dummyOrderProducts && dummyOrderProducts.length > 0 && dummyOrderProducts.filter((product,index)=>{
                   return product.orderStatus!=="CANCELED";
               })
               setListOfMyOrder([...dummyOrderProducts])
               setProductsData({ ...orderDetailData})
           } catch (error) {
               setListOfMyOrder([]);
               console.log("Error while fetching all product data",error)
           }
       }
        fetchData()
    }, [])
    useEffect(()=>{
        if (payloadData && (payloadData.length < listOfMyOrder.length || payloadData.length===0)){
         setIsCheckedAll(false);
       }
     else if (listOfMyOrder.length === payloadData.length){
         setIsCheckedAll(true);
       }
    }, [payloadData])
    const handleSelectAll=(event)=>{
      if(event.target.checked){
          let dummyPayload = []
          listOfMyOrder && listOfMyOrder.length > 0 && listOfMyOrder.map((data) => {
              dummyPayload.push({
                  status: 'CANCELED',
                  cancelReason: '',
                  product: data.orderProductId //this is orderProductId

              })
          })
        setPayloadData([...dummyPayload]);
        setIsCheckedAll(true)
      }
      else{
          setPayloadData([]);
          setIsCheckedAll(false);
      }
    }
    console.log("listorder", listOfMyOrder)

    return (
        <>
        { listOfMyOrder && listOfMyOrder.length>0 && 
        <div className={styles.subcontainer}>
            <div className={styles.selectItemTextHeader}>
                <div className={styles.selectItemCancel} >Select Item to cancel</div>
                <div className={styles.selectAll}>
                    <input type="checkbox" checked={isCheckedAll} className={styles.checkboxAll} onChange={handleSelectAll} />
                    <span>Select all</span>
                </div>
            </div>
            {listOfMyOrder && listOfMyOrder.length > 0 && listOfMyOrder.map((data, index) =>{
                return  (
                    <OrderItemList listOfMyOrder={listOfMyOrder} currency={productsData.currency} key={data.productId} data={data} setPayloadData={setPayloadData} payloadData={payloadData||[]} />
            )
                }
            )
            }
        </div>
        }
        </>
    )
}
export default ItmeListForCancellation;