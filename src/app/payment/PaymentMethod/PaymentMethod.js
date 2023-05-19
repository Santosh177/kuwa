
import styles from './payment-method.module.scss';

export default function PaymentMethod() {



  
      return (
        <div className={styles.paymentMethodWrapper}>
            <div className={styles.headerTxt}>Payment Method</div>
            <div className={styles.headerSubTxt}>Shop with confidence knowing all transactions are securely encrypted for your protection.</div>
            <div className={styles.paymentTypeHeaderTxt}>
                <img src='' alt=''/>
                <div>Pay with Credit or Debit card</div>
            </div>
        </div>
      )
    }
    