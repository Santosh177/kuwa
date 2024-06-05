
import { useState } from 'react';
import styles from './find-my-order.module.scss';
import OrderItemList from '../../orders/OrderItemList/OrderItemList';
import Loader from '@/app/[lng]/components/Loader/Loader';
import { useLanguage } from '@/context/languageDetails';

export default function FindMyOrder({ setShowOrderInfo }) {
  const [searchOrderId, setSearchOrderId] = useState('');
  const [orderList, setOrderList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [idError, setIdError] = useState('');

  const {listOfLanguages, selectedLanguage, isArabic, isEnglish, changeLanguage={}} = useLanguage();

  const getOrderList = async () => {
    if (!searchOrderId) {
      setError(isArabic ? "يرجى إدخال رقم طلب صالح" : 'Please enter your order ID');
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
          setIdError(isArabic ? "يرجى إدخال رقم طلب صالح" : 'Please enter a valid order ID');
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
        <div className={styles.orderStatusTxt}>{isArabic ? "حالة الطلب" : "Order Status"}</div>
        <div className={styles.subTxt}>
          {isArabic ? "أدخل" : "Enter your"} <span>{isArabic ? "'رقم الطلب'" : "'Order ID'"}</span> {isArabic ? "للتحقق من حالة الطلب" : "to check the order status"}
        </div>
        <div className={styles.orderIdContainer}>
        <div className={styles.orderIdSearchContainer}>
          <div className={styles.orderIdInputContainer}>
            <input
              type="text"
              placeholder= {isArabic ? "رقم الطلب" :  "Order ID"}
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
            {isArabic ? "ابحث عن طلبي" : "Find my order"}
          </div>
        </div>
        {error && <div className={styles.error}>{error}</div>}
      {idError && <div className={styles.error}>{idError}</div>}
        </div>
      </div>
      
      {isLoading ? (
        <Loader isShow={isLoading} />
      ) : (
        <div className={styles.itemListWrapper}>
         { orderList.map((data, index) => {
           return <OrderItemList key={index} data={data} index={index} />;
          })
         }
        </div>

      )}
    </>
  );
}

