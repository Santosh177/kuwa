
import { useState } from 'react';
import styles from './find-my-order.module.scss';
import OrderItemList from '../../orders/OrderItemList/OrderItemList';
import Loader from '@/components/Loader/Loader';

export default function FindMyOrder({ setShowOrderInfo }) {
  const [searchOrderId, setSearchOrderId] = useState('');
  const [orderList, setOrderList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [idError, setIdError] = useState('');

  const getOrderList = async () => {
    if (!searchOrderId) {
      setError('Please enter your order ID');
      setIdError('');
      setOrderList([])
    } else {
      // setIsLoading(true);
      try {
        const response = await fetch(
          `${process.env.BACKEND_END_POINT_URL}/module/find-my-order/${searchOrderId}`
        );
        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
          setOrderList(data);
          setIsLoading(false);
          setShowOrderInfo(false);
          setError('');
          setIdError('');
        } else {
          setError('');
          setIdError('Please enter a valid order ID');
          setSearchOrderId('');
          setOrderList([])
        }
      } catch (error) {
        setError('Error occurred while fetching data. Please try again later.');
        setIdError('');
      }
    }
  };

  return (
    <>
      <div className={styles.findMyOrderWrapper}>
        <div className={styles.orderStatusTxt}>Order Status</div>
        <div className={styles.subTxt}>
          Enter your <span>'Order ID'</span> to check the order status
        </div>
        <div className={styles.orderIdContainer}>
        <div className={styles.orderIdSearchContainer}>
          <div className={styles.orderIdInputContainer}>
            <input
              type="text"
              placeholder="Order ID"
              className={styles.orderIdInput}
              value={searchOrderId}
              onChange={(e) => setSearchOrderId(e.target.value)}
            />
            {searchOrderId && (
              <img
                onClick={() => setSearchOrderId('')}
                className={styles.crossIcon}
                src="https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/cross_icon_find_my_order.png"
                alt="cross_icon"
              />
            )}
          </div>
          <div className={styles.findMyorderBtn} onClick={getOrderList}>
            Find my order
          </div>
        </div>
        {error && <div className={styles.error}>{error}</div>}
      {idError && <div className={styles.error}>{idError}</div>}
        </div>
      </div>
      
      {isLoading ? (
        <Loader isShow={isLoading} />
      ) : (
        orderList.map((data, index) => {
          return <OrderItemList key={index} data={data} />;
        })
      )}
    </>
  );
}

