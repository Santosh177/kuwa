import React from 'react';
import styles from './prepaid-extra-discount.module.scss'

const PrepaidExtraDiscount = ({prePaidDiscount,paymentMethodConfig}) => {
  console.log("paymentMethodConfig",paymentMethodConfig);


  const paymentMethodImages = {
    card_tap: ["visa.png", "mastercard.png"],
    card_checkout:["visa.png", "mastercard.png"],
    tabby: "tabby.png",
    tamara: "tamaraLogo.png",
    applePay:"pay.png"
  };

  
  const renderPaymentImages = () => {
    return Object.keys(paymentMethodConfig).map(method => {
      const { isEnable } = paymentMethodConfig[method];
      if (isEnable) {
        let imageNames = paymentMethodImages[method] || ""; 
        if (Array.isArray(imageNames)) {
          return imageNames.map(imageName => (
            <div key={imageName} className={styles.imageDiv}>
              <img src={`https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/${imageName}`} alt={method} />
            </div>
          ));
        } else if (imageNames) {
          return( <div key={imageNames} className={styles.imageDiv}>
            <img src={`https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/${imageNames}`} alt={method} />
            </div>)
        }
        else{
          return (
            <></>
          );
        }
         }
      return null;
    }).flat(); 
  };

  const renderValidText = () => {
    const enabledMethods = Object.keys(paymentMethodConfig).filter(method => paymentMethodConfig[method].isEnable);
    if (enabledMethods.length === 0) {
      return null;
    }
    let text = "Valid on";
    if (enabledMethods.includes("card_tap") || enabledMethods.includes("card_checkout")) {
      text += " card payments";
    }
    if (enabledMethods.includes("tabby")) {
      text += ", tabby";
    }
    if (enabledMethods.includes("tamara")) {
      text += ", tamara";
    }
    if (enabledMethods.includes("applePay")) {
      text += ", apple pay";
    }
    return <div className={styles.txt}>{text}</div>;
  };
  return (
  prePaidDiscount &&
    <div className={styles.extraDiscountSection}>
        <div className={styles.dicountInfo}>Extra {prePaidDiscount}% OFF</div>
        <div className={styles.prePaidOptions}>
            <div className={styles.imageSection}>
            {renderPaymentImages()}
        </div>
        {renderValidText()}
        </div>
    </div>
    )
}

export default PrepaidExtraDiscount